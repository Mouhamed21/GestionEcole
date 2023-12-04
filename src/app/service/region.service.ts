import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Region} from "../modele/region";

@Injectable({
  providedIn: 'root'
})
export class RegionService {

    baseUrl = environment.urlApi + '/region';
    constructor(private httpClient: HttpClient) {
    }

    getAllRegion() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getRegionById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postRegion(region: Region) {
        return this.httpClient.post(`${this.baseUrl}`, region)
    }

    updateRegion(id: number, region: Region) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, region)
    }

    deleteRegion(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllRegion(regionSelectionne: any) {
        return this.httpClient.patch(`${this.baseUrl}`, regionSelectionne)
    }
}
