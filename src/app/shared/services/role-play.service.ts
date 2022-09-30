import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "src/environments/environment";
import { Context } from "../model/context";
import { ContextReq } from "../model/contextReq";

@Injectable({
    providedIn: 'root'
})
export class RolePlayService {
    constructor(private http: HttpClient) { }

    public postContextOriginal(route: string, body: ContextReq) {
        return this.http.post<Context>(this.createCompleteRouteContext(route), body);
    }
    private createCompleteRouteContext = (route: string) => {
        return `${environment.urlAddress}/${environment.serviceNameContext}`;
    }
}