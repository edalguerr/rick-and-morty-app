import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetQueryParams } from '../../interfaces/query-params';
import { environment } from '../../../../environments/development';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly baseUrl: string = environment.baseGateway;

  constructor(private httpClient: HttpClient) {}

  get(
    path: string,
    queryParams?: IGetQueryParams,
    headers = {}
  ): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    let params = new HttpParams();

    if (queryParams && queryParams.pagination) {
      const { size, currentPage } = queryParams.pagination;
      if (size) {
        params = params.set('size', size.toString());
      }
      if (currentPage !== undefined && currentPage !== null) {
        params = params.set('page', currentPage.toString());
      }
    }

    if (queryParams && queryParams.filter) {
      Object.entries(queryParams.filter).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params = params.set(key, value?.toString());
        }
      });
    }

    if (queryParams && queryParams.query) {
      Object.entries(queryParams.query).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params = params.set(key, value?.toString());
        }
      });
    }
    return this.httpClient.get(url, { params, headers });
  }

  put(path: string, body: any, headers = {}): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    const requestOptions = { headers };
    return this.httpClient.put(url, body, requestOptions);
  }

  post(path: string, body: any, headers = {}): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    const requestOptions = { headers };
    return this.httpClient.post(url, body, requestOptions);
  }
}
