import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Filiere} from "../modele/Filiere";

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

    baseUrl = environment.urlApi + '/filiere';
    constructor(private httpClient: HttpClient) {
    }

    getFilieres() {
        return this.httpClient.get(`${this.baseUrl}`);
    }
    getFiliereById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }
    postFiliere(filiere: Filiere) {
        return this.httpClient.post(`${this.baseUrl}`, filiere)
    }

    updateFiliere(id: number, filiere: Filiere) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, filiere)
    }

    deleteFiliere(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllFiliere(filiereSelectionne: any) {
        //return this.httpClient.delete(`${this.urlApi}`, classeSelectionne)
        return this.httpClient.patch(`${this.baseUrl}`, filiereSelectionne)
    }
}
