import {Classe} from "./classe";

export class Eleve {
    constructor(
        public id?: number,
        public age?: number,
        public nom?: string,
        public prenom?: string,
        public classe?: Classe
    ) { }
}
