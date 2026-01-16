export function getCaretCoords(
  textarea: HTMLTextAreaElement,
  caretPos: number
): { x: number; y: number; lineHeight: number } {
  const style = window.getComputedStyle(textarea);

  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.style.whiteSpace = 'pre-wrap';
  div.style.wordWrap = 'break-word';
  div.style.left = '-9999px';
  div.style.top = '0';

  // Copy layout-affecting textarea styles
  const props = [
    'fontFamily','fontSize','fontWeight','fontStyle','letterSpacing','textTransform',
    'padding','border','boxSizing','lineHeight','width'
  ] as const;
  for (const p of props) (div.style as any)[p] = style[p];

  div.textContent = textarea.value.substring(0, caretPos);

  const span = document.createElement('span');
  span.textContent = textarea.value.substring(caretPos) || '.';
  div.appendChild(span);

  document.body.appendChild(div);

  const spanRect = span.getBoundingClientRect();
  const divRect = div.getBoundingClientRect();
  const taRect = textarea.getBoundingClientRect();

  const lineHeight = parseFloat(style.lineHeight || '16') || 16;

  document.body.removeChild(div);

  return {
    x: taRect.left + (spanRect.left - divRect.left) - textarea.scrollLeft,
    y: taRect.top + (spanRect.top - divRect.top) - textarea.scrollTop,
    lineHeight
  };
}
