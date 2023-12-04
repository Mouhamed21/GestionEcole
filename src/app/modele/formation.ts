import {ResponsableFormation} from "./responsableFormation";

export class Formation {
    constructor(
        public id?: number,
        public libelle?: string,
        public dateDebut?: Date,
        public duree?:number,
        public dateFinPrevue?:number,
        public responsableFormation?: ResponsableFormation
    ) { }
}
