import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NiveauQualificationCible} from "../modele/niveauQualificationCible";

@Injectable({
  providedIn: 'root'
})
export class NiveauQualificationCibleService {

    baseUrl = environment.urlApi + '/niveauQualificationCible';
    constructor(private httpClient: HttpClient) {
    }

    getAllNiveauQualificationCible() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getNiveauQualificationCibleById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postNiveauQualificationCible(niveauQualificationCible: NiveauQualificationCible) {
        return this.httpClient.post(`${this.baseUrl}`, niveauQualificationCible)
    }

    updateNiveauQualificationCible(id: number, niveauQualificationCible: NiveauQualificationCible) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, niveauQualificationCible)
    }

    deleteNiveauQualificationCible(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllNiveauQualificationCible(niveauSelectionne: any) {
        //return this.httpClient.delete(`${this.urlApi}`, classeSelectionne)
        return this.httpClient.patch(`${this.baseUrl}`, niveauSelectionne)
    }
}
