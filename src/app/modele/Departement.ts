import {Region} from "./region";

export class Departement{
    constructor(
        public id?: number,
        public libelle?: string,
        public region?: Region
    ) { }
}
