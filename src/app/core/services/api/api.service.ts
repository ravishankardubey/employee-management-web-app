import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  get(url) {
    return this.httpClient.get<any>(url);
  }

  post(url, payloadData) {
    return this.httpClient.post<any>(url, payloadData);
  }

  put(url, payloadData) {
    return this.httpClient.put<any>(url, payloadData);
  }

  patch(url, payloadData) {
    return this.httpClient.patch<any>(url, payloadData);
  }

  delete(url) {
    return this.httpClient.delete<any>(url);
  }
}
