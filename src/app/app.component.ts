import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageToolService } from './languagetool.service';
import { LTMatch } from './languagetool.models';
import { getCaretCoords } from './textarea-caret.util';
import { diffTokens } from './diff.util';

type Segment =
  | { kind: 'text'; value: string }
  | { kind: 'error'; value: string; matchIndex: number };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  text = 'i not awar of it. whnt to gt moe info about it';
  originalText = '';
  matches: LTMatch[] = [];
  segments: Segment[] = [];

  isChecking = false;
  errorMsg = '';

  // Visible in UI for easier debugging
  lastRequest: any = null;
  lastResponse: any = null;
  lastError: any = null;

  activeMatchIndex: number | null = null;
  dropdown = { open: false, x: 0, y: 0, selectedIdx: 0 };

  diffLeft: { kind: 'same' | 'add' | 'del'; text: string }[] = [];
  diffRight: { kind: 'same' | 'add' | 'del'; text: string }[] = [];

  @ViewChild('ta', { static: true }) textareaRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('hl', { static: true }) highlightRef!: ElementRef<HTMLDivElement>;

  constructor(private lt: LanguageToolService) {}

  clear(): void {
    this.text = '';
    this.originalText = '';
    this.matches = [];
    this.segments = [];
    this.activeMatchIndex = null;
    this.dropdown.open = false;
    this.errorMsg = '';
    this.diffLeft = [];
    this.diffRight = [];
    this.lastRequest = null;
    this.lastResponse = null;
    this.lastError = null;
  }

  check(userInitiated: boolean = true): void {
    this.errorMsg = '';
    this.dropdown.open = false;
    this.activeMatchIndex = null;

    const t = this.text ?? '';
    if (!t.trim()) {
      this.matches = [];
      this.segments = [{ kind: 'text', value: '' }];
      return;
    }

    this.isChecking = true;
    this.originalText = t;

    this.lastRequest = { endpoint: '/lt/v2/check', language: 'en-US', text: t };
    this.lastResponse = null;
    this.lastError = null;

    console.info('[LanguageToolDemo] Input text:', t);

    this.lt.check(t, 'en-US').subscribe({
      next: (resp) => {
        this.lastResponse = resp;
        console.info('[LanguageToolDemo] Raw response:', resp);
        this.matches = this.normalizeMatches(resp.matches ?? [], t.length);
        console.info('[LanguageToolDemo] Parsed matches:', this.matches);
        this.segments = this.buildSegments(t, this.matches);
        console.info('[LanguageToolDemo] Built highlight segments:', this.segments);
        this.computeDiff();
        this.isChecking = false;
      },
      error: (err) => {
        this.lastError = err;
        console.info('[LanguageToolDemo] Request failed:', err);
        this.isChecking = false;
        this.errorMsg =
          'LanguageTool call failed. Ensure LanguageTool is running on http://localhost:8081 and you started Angular with the proxy (npm start).';
      },
    });
  }

  onInput(): void {
    this.syncScroll();
    this.computeDiff();
    // offsets can be stale after edits; user can re-check.
    this.dropdown.open = false;
    this.activeMatchIndex = null;
  }

  onScroll(): void {
    this.syncScroll();
  }

  onCaretMove(): void {
    this.maybeOpenDropdownForCaret();
  }

  onKeyDown(e: KeyboardEvent): void {
    // TAB: jump to next/previous error
    if (e.key === 'Tab') {
      if (!this.matches.length) return;
      e.preventDefault();
      this.gotoNextError(e.shiftKey ? -1 : 1);
      return;
    }

    // Dropdown keyboard control
    if (this.dropdown.open) {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.dropdown.open = false;
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.dropdown.selectedIdx = Math.min(this.dropdown.selectedIdx + 1, this.activeReplacements().length - 1);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.dropdown.selectedIdx = Math.max(this.dropdown.selectedIdx - 1, 0);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const repl = this.activeReplacements()[this.dropdown.selectedIdx];
        if (repl) this.applySuggestion(repl.value);
        return;
      }
    }
  }

  applySuggestion(value: string): void {
    if (this.activeMatchIndex == null) return;
    const m = this.matches[this.activeMatchIndex];
    if (!m) return;

    const before = this.text.substring(0, m.offset);
    const after = this.text.substring(m.offset + m.length);
    this.text = before + value + after;

    const ta = this.textareaRef.nativeElement;
    const newPos = before.length + value.length;

    queueMicrotask(() => {
      ta.focus();
      ta.setSelectionRange(newPos, newPos);
      this.dropdown.open = false;
      // Re-run check so offsets stay correct after edits
      this.check(false);
    });
  }

  segmentTitle(seg: Segment): string {
    if (seg.kind !== 'error') return '';
    const m = this.matches[seg.matchIndex];
    const top = m?.replacements?.[0]?.value;
    return top ? `${m.message} → ${top}` : (m?.message ?? '');
  }

  activeReplacements(): { value: string; shortDescription?: string }[] {
    if (this.activeMatchIndex == null) return [];
    const m = this.matches[this.activeMatchIndex];
    if (!m?.replacements?.length) return [];
    return m.replacements.slice(0, 10);
  }

  activeMessage(): string {
    if (this.activeMatchIndex == null) return '';
    return this.matches[this.activeMatchIndex]?.message ?? '';
  }

  private normalizeMatches(matches: LTMatch[], textLen: number): LTMatch[] {
    const sorted = [...matches]
      .filter(m => m && m.offset >= 0 && m.length > 0 && m.offset + m.length <= textLen)
      .sort((a, b) => a.offset - b.offset);

    const out: LTMatch[] = [];
    let lastEnd = -1;
    for (const m of sorted) {
      const start = m.offset;
      const end = m.offset + m.length;
      if (start < lastEnd) continue; // skip overlaps for demo
      out.push(m);
      lastEnd = end;
    }
    return out;
  }

  private buildSegments(text: string, matches: LTMatch[]): Segment[] {
    const segs: Segment[] = [];
    let i = 0;
    matches.forEach((m, idx) => {
      if (m.offset > i) segs.push({ kind: 'text', value: text.slice(i, m.offset) });
      segs.push({ kind: 'error', value: text.slice(m.offset, m.offset + m.length), matchIndex: idx });
      i = m.offset + m.length;
    });
    if (i < text.length) segs.push({ kind: 'text', value: text.slice(i) });
    if (!segs.length) segs.push({ kind: 'text', value: text });
    return segs;
  }

  private syncScroll(): void {
    const ta = this.textareaRef.nativeElement;
    const hl = this.highlightRef.nativeElement;
    hl.scrollTop = ta.scrollTop;
    hl.scrollLeft = ta.scrollLeft;
  }

  private gotoNextError(direction: 1 | -1): void {
    const ta = this.textareaRef.nativeElement;
    const pos = ta.selectionStart ?? 0;

    const list = this.matches;
    if (!list.length) return;

    const idx = direction === 1
      ? list.findIndex(m => m.offset > pos)
      : (() => {
          for (let i = list.length - 1; i >= 0; i--) if (list[i].offset < pos) return i;
          return -1;
        })();

    const nextIndex = idx >= 0 ? idx : (direction === 1 ? 0 : list.length - 1);
    const m = list[nextIndex];

    ta.focus();
    ta.setSelectionRange(m.offset, m.offset + m.length);
    this.activeMatchIndex = nextIndex;
    this.dropdown.selectedIdx = 0;
    this.openDropdownAtCaret(m.offset);
  }

  private maybeOpenDropdownForCaret(): void {
    const ta = this.textareaRef.nativeElement;
    const pos = ta.selectionStart ?? 0;

    const idx = this.matches.findIndex(m => pos >= m.offset && pos <= (m.offset + m.length));
    if (idx === -1) {
      this.activeMatchIndex = null;
      this.dropdown.open = false;
      return;
    }

    if (this.activeMatchIndex !== idx) {
      this.activeMatchIndex = idx;
      this.dropdown.selectedIdx = 0;
    }

    this.openDropdownAtCaret(pos);
  }

  private openDropdownAtCaret(caretPos: number): void {
    const ta = this.textareaRef.nativeElement;
    const coords = getCaretCoords(ta, caretPos);
    this.dropdown.x = coords.x;
    this.dropdown.y = coords.y + coords.lineHeight + 6;
    this.dropdown.open = true;
  }

  private computeDiff(): void {
    if (!this.originalText) {
      this.diffLeft = [];
      this.diffRight = [];
      return;
    }
    const d = diffTokens(this.originalText, this.text ?? '');
    this.diffLeft = d.left;
    this.diffRight = d.right;
  }
}
