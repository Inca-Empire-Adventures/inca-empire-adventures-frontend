import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserReq } from '../../model/auth/user-req';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenResponse } from '../../model/auth/token-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(userReq: UserReq): Observable<TokenResponse> {
    const url = `${environment.urlAddress}/${environment.serviceAuth}/`;
    return this.http.post<TokenResponse>(url, userReq);
  }
}
