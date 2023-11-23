import {Branche} from "./branche";

export class Filiere {
    constructor(
        public id?: number,
        public libelle?: string,
        //public eleves?: any,
        public branche?: Branche
    ) { }
}
