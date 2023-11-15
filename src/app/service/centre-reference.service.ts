import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NiveauEntre} from "../modele/niveauEntre";
import {CentreReference} from "../modele/centreReference";

@Injectable({
  providedIn: 'root'
})
export class CentreReferenceService {

    baseUrl = environment.urlApi + '/centreReference';
    constructor(private httpClient: HttpClient) {
    }

    getAllCentreReference() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getCentreReferenceById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postCentreReference(centreReference: CentreReference) {
        return this.httpClient.post(`${this.baseUrl}`, centreReference)
    }

    updateCentreReference(id: number, centreReference: CentreReference) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, centreReference)
    }

    deleteCentreReference(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllCentreReference(centreSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, centreSelectionne)
    }
}
