import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = environment.baseUrl;

  constructor(private _httpClient: HttpClient) {}

  get<T = unknown>(url: string, params?: HttpParams): Observable<T> {
    return this._httpClient.get<T>(`${this.url}/${url}`, {
      params: params,
    });
  }

  post<T, RT = unknown>(url: string, body: T): Observable<RT> {
    return this._httpClient.post<RT>(`${this.url}/${url}`, body);
  }

  put<T, RT = unknown>(url: string, body: T): Observable<RT> {
    return this._httpClient.put<RT>(`${this.url}/${url}`, body);
  }

  delete<T, RT = unknown>(url: string, id: T): Observable<RT> {
    return this._httpClient.delete<RT>(`${this.url}/${url}/${id}`);
  }
}
