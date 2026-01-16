import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageToolResponse } from './languagetool.models';

@Injectable({ providedIn: 'root' })
export class LanguageToolService {
  // Proxied via proxy.conf.json to avoid CORS:
  // /lt -> http://localhost:8081 (and pathRewrite strips /lt)
  // so /lt/v2/check becomes http://localhost:8081/v2/check
  private readonly endpoint = '/lt/v2/check';

  constructor(private http: HttpClient) {}

  check(text: string, language = 'en-US'): Observable<LanguageToolResponse> {
    console.info('[LanguageToolDemo] POST', this.endpoint, { language, textLength: text?.length ?? 0 });
    const body = new URLSearchParams();
    body.set('language', language);
    body.set('text', text);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<LanguageToolResponse>(this.endpoint, body.toString(), { headers });
  }
}
