import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Secteur} from "../modele/secteur";

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

    baseUrl = environment.urlApi + '/secteur';
    constructor(private httpClient: HttpClient) {
    }

    getAllSecteur() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getSecteurById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postSecteur(secteur: Secteur) {
        return this.httpClient.post(`${this.baseUrl}`, secteur)
    }

    updateSecteur(id: number, secteur: Secteur) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, secteur)
    }

    deleteSecteur(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllSecteur(secteurSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, secteurSelectionne)
    }
}
