import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Metier} from "../modele/metier";

@Injectable({
  providedIn: 'root'
})
export class MetierService {

    baseUrl = environment.urlApi + '/metier';
    constructor(private httpClient: HttpClient) {
    }

    getAllMetier() {
        return this.httpClient.get(`${this.baseUrl}`);
    }
    getMetierById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }
    postMetier(metier: Metier) {
        return this.httpClient.post(`${this.baseUrl}`, metier)
    }

    updateMetier(id: number, metier: Metier) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, metier)
    }

    deleteMetier(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllMetier(metierSelectionne: any) {
        //return this.httpClient.delete(`${this.urlApi}`, classeSelectionne)
        return this.httpClient.patch(`${this.baseUrl}`, metierSelectionne)
    }
}
