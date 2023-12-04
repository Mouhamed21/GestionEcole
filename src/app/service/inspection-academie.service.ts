import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {InspectionAcademie} from "../modele/inspectionAcademie";

@Injectable({
  providedIn: 'root'
})
export class InspectionAcademieService {

    baseUrl = environment.urlApi + '/inspectionAcademie';
    constructor(private httpClient: HttpClient) {
    }

    getAllInspectionAcademie() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getInspectionAcademieById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postInspectionAcademie(inspectionAcademie: InspectionAcademie) {
        return this.httpClient.post(`${this.baseUrl}`, inspectionAcademie)
    }

    updateInspectionAcademie(id: number, inspectionAcademie: InspectionAcademie) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, inspectionAcademie)
    }

    deleteInspectionAcademie(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllInspectionAcademie(inspectionAcademieSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, inspectionAcademieSelectionne)
    }
}
