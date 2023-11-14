import { Component, OnInit } from '@angular/core';
import {MatiereService} from "../../service/matiere.service";
import {Matiere} from "../../modele/Matiere";
import {ConfirmationService, MessageService} from "primeng/api";
import {EleveService} from "../../service/eleve.service";
import {Niveau} from "../../modele/niveau";

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.scss'],
  providers: [MatiereService,MessageService,ConfirmationService,EleveService]
})
export class MatiereComponent implements OnInit {
  matieres:any;
  matiere: Matiere;
    submitted: boolean;
    matiereDialog: boolean;
    editMatiereDialog: boolean;
  constructor(private matiereService: MatiereService, private messageService: MessageService) { }

  ngOnInit(): void {
      this.getAllMatiere();
  }

  getAllMatiere(){
      return this.matiereService.getAllMatiere().subscribe(data =>{
          this.matieres=data;
          console.log(this.matieres);
      })
  }

    openNew() {
        this.matiere = {};
        this.submitted = false
        this.matiereDialog = true;
        this.editMatiereDialog = true;
    }

    editMatiere(matiere: Matiere) {
        this.matiere = {...matiere};
        console.log(this.matiere);
        this.matiereDialog = true;
    }


    hideDialog() {
        this.matiereDialog = false;
        this.submitted = false;
        this.editMatiereDialog = false;
       // this.annee=null;
    }
    public postMatiere() {
        this.submitted = true;

        //this.niveau.annee=this.annee.getFullYear().toString();
        //console.log(this.niveau.annee);
        //this.niveau.annee=this.annee.getFullYear();

        if (this.matiere.nom.trim()) {
            if (this.matiere.id) {
                this.matiereService.updateMatiere(this.matiere.id,this.matiere).subscribe(
                    data => {
                        console.log(data);
                        //this.editNiveauDialog = false;
                        this.matiere = {};
                        this.getAllMatiere();
                    },
                    error => {
                        console.log(error);
                    }
                );
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Matiere', life: 3000});
            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.matiereService.postMatiere(this.matiere).subscribe( data =>
                {
                    console.log(this.matiere);
                   // this.niveauSubject.next();
                    this.matiereDialog = false;
                    this.getAllMatiere();
                    //this.annee=null;
                }),
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Matiere', life: 3000});
            }

            this.matieres = [...this.matieres];
            this.matiereDialog = false;
            // this.annee=null;
            this.matiere = {};
        }
    }
    first = 0;

    rows = 10;

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.matieres ? this.first === (this.matieres.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.matieres ? this.first === 0 : true;
    }
}
