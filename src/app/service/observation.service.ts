import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observation} from "../modele/observation";

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

    baseUrl = environment.urlApi + '/observation';
    constructor(private httpClient: HttpClient) {
    }

    getAllObservation() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getObservationById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postObservation(observation: Observation) {
        return this.httpClient.post(`${this.baseUrl}`, observation)
    }

    updateObservation(id: number, observation: Observation) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, observation)
    }

    deleteObservation(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllObservation(observationSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, observationSelectionne)
    }
}
