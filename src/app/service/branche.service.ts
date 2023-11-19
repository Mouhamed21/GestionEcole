import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Branche} from "../modele/branche";

@Injectable({
  providedIn: 'root'
})
export class BrancheService {

    baseUrl = environment.urlApi + '/branche';
    constructor(private httpClient: HttpClient) {
    }

    getAllBranche() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getBrancheById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postBranche(branche: Branche) {
        return this.httpClient.post(`${this.baseUrl}`, branche)
    }

    updateBranche(id: number, branche: Branche) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, branche)
    }

    deleteBranche(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllBranche(brancheSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, brancheSelectionne)
    }
}
