import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserReq } from '../model/user-req';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  createUser(userReq: UserReq): Observable<UserReq>  {
    const url = `${environment.urlAddress}/${environment.serviceNameUsers}/`;
    return this.http.post<UserReq>(url,userReq);
}
}
