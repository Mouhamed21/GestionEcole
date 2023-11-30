import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Departement} from "../modele/Departement";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

    baseUrl = environment.urlApi + '/departement';
    constructor(private httpClient: HttpClient) {
    }

    getAllDepartement() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getDepartementById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postDepartement(departement: Departement) {
        return this.httpClient.post(`${this.baseUrl}`, departement)
    }

    updateDepartement(id: number, departement: Departement) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, departement)
    }

    deleteDepartement(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllDepartement(departementSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, departementSelectionne)
    }
}
