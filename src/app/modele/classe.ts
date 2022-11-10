import {Niveau} from "./niveau";

export class Classe {
    constructor(
        public id?: number,
        public nom?: string,
        public eleves?: any,
        public niveau?: Niveau
    ) { }
}
