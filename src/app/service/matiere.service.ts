import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Matiere} from "../modele/Matiere";

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

    baseUrl = environment.urlApi + '/matiere';
        constructor(private httpClient: HttpClient) {
    }

    getAllMatiere(){
        return this.httpClient.get(`${this.baseUrl}`);
    }

    postMatiere(matiere: Matiere){
            return this.httpClient.post(`${this.baseUrl}`, matiere)
    }

    updateMatiere(id: number,matiere: Matiere){
            return this.httpClient.put(`${this.baseUrl}/${id}`, matiere)
    }

}
