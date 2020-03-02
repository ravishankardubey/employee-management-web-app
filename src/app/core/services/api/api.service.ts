import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from './../loader/loader.service';
import { map, catchError } from 'rxjs/operators';
import { LOADER_STATUS } from './../../../../config/constants';
import { CommonService } from './../common/common.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    private commonService: CommonService
  ) { }

  get(url: string) {
    this.loaderStart();
    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map((response: any) => {
          this.loaderSuccess();
          return response;
        }),
        catchError(err => this.handleError(err))
      );
  }

  post(url: string, payloadData: object) {
    this.loaderStart();
    return this.httpClient.post<any>(url, payloadData, this.httpOptions)
      .pipe(
        map((response: any) => {
          this.loaderSuccess();
          return response;
        }),
        catchError(err => this.handleError(err))
      );
  }

  put(url: string, payloadData: object) {
    this.loaderStart();
    return this.httpClient.put<any>(url, payloadData, this.httpOptions)
      .pipe(
        map((response: any) => {
          this.loaderSuccess();
          return response;
        }),
        catchError(err => this.handleError(err))
      );
  }

  patch(url: string, payloadData: object) {
    this.loaderStart();
    return this.httpClient.patch<any>(url, payloadData, this.httpOptions)
      .pipe(
        map((response: any) => {
          this.loaderSuccess();
          return response;
        }),
        catchError(err => this.handleError(err))
      );
  }

  delete(url: string) {
    this.loaderStart();
    return this.httpClient.delete<any>(url, this.httpOptions)
      .pipe(
        map((response: any) => {
          this.loaderSuccess();
          return response;
        }),
        catchError(err => this.handleError(err))
      );
  }

  get httpOptions() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return { headers: headers };
  }

  handleError(error) {
    this.loaderFailed();
    const ERROR_MSG = error.error ? error.error.message : error.message || 'Technical Error Occured';
    this.commonService.openSnackBar(ERROR_MSG);
    return error;
  }

  loaderStart() {
    this.loaderService.setLoaderStatus(LOADER_STATUS['loading']);
  }

  loaderFailed() {
    this.loaderService.setLoaderStatus(LOADER_STATUS['failed']);
  }

  loaderSuccess() {
    this.loaderService.setLoaderStatus(LOADER_STATUS['success']);
  }

}
