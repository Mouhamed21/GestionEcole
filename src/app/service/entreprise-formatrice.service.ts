import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {EntrepriseFormatrice} from "../modele/entrepriseFormatrice";

@Injectable({
  providedIn: 'root'
})
export class EntrepriseFormatriceService {

    baseUrl = environment.urlApi + '/entrepriseFormatrice';
    constructor(private httpClient: HttpClient) {
    }

    getAllEntrepriseFormatrice() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getEntrepriseFormatriceById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postEntrepriseFormatrice(entrepriseFormatrice: EntrepriseFormatrice) {
        return this.httpClient.post(`${this.baseUrl}`, entrepriseFormatrice)
    }

    updateEntrepriseFormatrice(id: number, entrepriseFormatrice: EntrepriseFormatrice) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, entrepriseFormatrice)
    }

    deleteEntrepriseFormatrice(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllEntrepriseFormatrice(entrepriseFormatriceSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, entrepriseFormatriceSelectionne)
    }
}
