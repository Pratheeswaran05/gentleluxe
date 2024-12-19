import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public source=" http://localhost:3000/"
  constructor(private http:HttpClient) { }
  getData(url: string): Observable<any> {
    return this.http.get<any>(this.source+url);
  }
  postData(url: string,data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.source+url, data, { headers });
  }
  updateData(url: string,data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.source+url,data,{ headers: new HttpHeaders });
  }

  deleteData(url:any): Observable<any> {
    return this.http.delete<any>(this.source+url);
  }
}

