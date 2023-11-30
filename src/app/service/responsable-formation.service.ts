import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ResponsableFormation} from "../modele/responsableFormation";

@Injectable({
  providedIn: 'root'
})
export class ResponsableFormationService {

    baseUrl = environment.urlApi + '/responsableFormation';
    constructor(private httpClient: HttpClient) {
    }

    getAllResponsableFormation() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getResponsableFormationById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postResponsableFormation(responsableFormation: ResponsableFormation) {
        return this.httpClient.post(`${this.baseUrl}`, responsableFormation)
    }

    updateResponsableFormation(id: number, responsableFormation: ResponsableFormation) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, responsableFormation)
    }

    deleteResponsableFormation(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllResponsableFormation(responsableFormationSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, responsableFormationSelectionne)
    }
}
