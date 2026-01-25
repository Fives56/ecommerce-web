import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private http = inject(HttpClient);
  protected apiUrl = environment.apiUrl;
  url: string = '';

  all() {
    return this.http.get(`${this.apiUrl}${this.url}`);
  }
}
