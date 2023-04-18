import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Statistics } from "../model/statistics";
import { StatisticsReq } from "../model/statisticsReq";
import { Adventure } from "../model/adventure";

@Injectable({
    providedIn: 'root'
})
export class AdventureService {
    constructor(private http: HttpClient) { }

    public postAdventure(route: string, body: Adventure) {
        return this.http.post<Adventure>(this.createCompleteRouteContext(route), body);
    }

    public getAllAdventures(route: string) {
        return this.http.get<Adventure[]>(this.createCompleteRouteContext(route));
    }

    private createCompleteRouteContext = (route: string) => {
        return `${environment.urlAddress}/${environment.serviceNameContext}/`;
    }
}