import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Classe} from "../modele/classe";
import {Eleve} from "../modele/eleve";

@Injectable({
  providedIn: 'root'
})
export class EleveService {
    baseUrl = environment.urlApi + '/eleve';
    baseUrl1 = environment.urlApi + '/eleve/classe';
  constructor(private httpClient: HttpClient) { }

    getEleves() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getElevesByClasse(id:number){
        return this.httpClient.get(`${this.baseUrl1}/${id}`);
    }

    postEleve(eleve: Eleve) {
        return this.httpClient.post(`${this.baseUrl}`, eleve)
    }

    updateEleve(id: number, eleve: Eleve) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, eleve)
    }

    deleteClasse(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllEleves(eleveSelectionne: any) {
        //return this.httpClient.delete(`${this.urlApi}`, classeSelectionne)
        return this.httpClient.patch(`${this.baseUrl}`, eleveSelectionne)
    }
}
