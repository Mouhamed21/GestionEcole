import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Classe} from "../modele/classe";
import {Niveau} from "../modele/niveau";

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

    baseUrl = environment.urlApi + '/niveau';
    constructor(private httpClient: HttpClient) {
    }

    getNiveaux() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getNiveauById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postNiveau(niveau: Niveau) {
        return this.httpClient.post(`${this.baseUrl}`, niveau)
    }

    updateNiveau(id: number, niveau: Niveau) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, niveau)
    }

    deleteNiveau(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllNiveau(niveauSelectionne: any) {
        //return this.httpClient.delete(`${this.urlApi}`, classeSelectionne)
        return this.httpClient.patch(`${this.baseUrl}`, niveauSelectionne)
    }
}
