import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NiveauEntre} from "../modele/niveauEntre";

@Injectable({
  providedIn: 'root'
})
export class NiveauEntreService {
    baseUrl = environment.urlApi + '/niveauEntre';
    constructor(private httpClient: HttpClient) {
    }

    getAllNiveauEntre() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getNiveauEntreById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postNiveauEntre(niveauEntre: NiveauEntre) {
        return this.httpClient.post(`${this.baseUrl}`, niveauEntre)
    }

    updateNiveauEntre(id: number, niveauEntre: NiveauEntre) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, niveauEntre)
    }

    deleteNiveauEntre(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllNiveauEntre(niveauSelectionne: any) {
        //return this.httpClient.delete(`${this.urlApi}`, classeSelectionne)
        return this.httpClient.patch(`${this.baseUrl}`, niveauSelectionne)
    }
}
