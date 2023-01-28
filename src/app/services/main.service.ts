import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MainService {
  apiUrl = environment.apiUrl;
  refUrl = environment.refUrl;

  constructor(private http: HttpClient) {}

  post<A>(url: string, body: any): Observable<A> {
    return this.http.post<A>(this.apiUrl + url, body);
  }
  postReference<A>(url: string, body: any): Observable<A> {
    return this.http.post<A>(this.apiUrl + this.refUrl, body);
  }
}
