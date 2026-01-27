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

  /**
   * Fetches all records from the resource endpoint.
   * @returns Observable of all records
   */
  all() {
    return this.http.get(`${this.apiUrl}${this.url}`);
  
  }
  /**
   * Get a single record by id from the resource endpoint.
   * @returns Observable of all records
   */
  get(id: number) {
    return this.http.get(`${this.apiUrl}${this.url}/${id}`);
  }
}
