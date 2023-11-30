import {Secteur} from "./secteur";
import {Filiere} from "./Filiere";

export class Metier {
    constructor(
        public id?: number,
        public libelle?: string,
        public filiere?: Filiere,
        public secteur?: Secteur
    ) { }
}
