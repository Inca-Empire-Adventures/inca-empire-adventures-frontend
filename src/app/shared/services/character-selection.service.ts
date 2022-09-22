import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "src/environments/environment";
import { Character } from "../model/character";

@Injectable({
    providedIn: 'root'
})
export class CharacterSelectionService {
    constructor(private http: HttpClient) { }

    public getAllCharacters(route: string) {
        return this.http.get<Character[]>(this.createCompleteRouteCharacters(route));
    }

    private createCompleteRouteCharacters = (route: string) => {
        return `${environment.urlAddress}/${environment.serviceNameCharacters}/${route}`;
    }
    /*
    private generateHeaders = () =>{
        return{
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                //'Authorization': 'Basic' + btoa('username:password')
            })
        }
    }*/
}
