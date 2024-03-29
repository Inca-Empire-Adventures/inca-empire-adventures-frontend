import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Statistics } from "../model/statistics";
import { StatisticsReq } from "../model/statisticsReq";

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {
    constructor(private http: HttpClient) { }

    public postStatistics(route: string, body: StatisticsReq) {
        return this.http.post<Statistics>(this.createCompleteRouteContext(route), body);
    }

    public getAllStatistics(route: string) {
        return this.http.get<Statistics[]>(this.createCompleteRouteContext(route));
    }
    public getMyStatistics(route: string) {
        return this.http.get<Statistics>(`${environment.urlAddress}/statistics/${route}`);
    }

    private createCompleteRouteContext = (route: string) => {
        return `${environment.urlAddress}/${environment.serviceNameSatistics}/`;
    }
}