import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Formation} from "../modele/formation";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

    baseUrl = environment.urlApi + '/formation';
    constructor(private httpClient: HttpClient) {
    }

    getAllFormation() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getFormationById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postFormation(formation: Formation) {
        return this.httpClient.post(`${this.baseUrl}`, formation)
    }

    updateFormation(id: number, formation: Formation) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, formation)
    }

    deleteFormation(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllFormation(formationSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, formationSelectionne)
    }
}
