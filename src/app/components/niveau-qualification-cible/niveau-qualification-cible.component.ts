import { Component, OnInit } from '@angular/core';
import {NiveauEntreService} from "../../service/niveau-entre.service";
import {EleveService} from "../../service/eleve.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {NiveauQualificationCibleService} from "../../service/niveau-qualification-cible.service";
import {NiveauEntre} from "../../modele/niveauEntre";
import {NiveauQualificationCible} from "../../modele/niveauQualificationCible";

@Component({
  selector: 'app-niveau-qualification-cible',
  templateUrl: './niveau-qualification-cible.component.html',
  styleUrls: ['./niveau-qualification-cible.component.scss'],
    providers: [NiveauQualificationCibleService,MessageService,ConfirmationService,EleveService]
})
export class NiveauQualificationCibleComponentComponent implements OnInit {
    niveauQualificationCibles:any;
    niveauQualificationCible: NiveauQualificationCible;
    selectedNiveaux: any;
    submitted: boolean;
    niveauQualificationCibleDialog: boolean;
    editQualificationCibleEntreDialog: boolean;
    constructor(private niveauQualificationCibleService: NiveauQualificationCibleService, private eleveService: EleveService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllNiveauQualificationCible();
  }
    public getAllNiveauQualificationCible(){
        console.log('On Init ...');
        return this.niveauQualificationCibleService.getAllNiveauQualificationCible().subscribe((data) =>
        {
            console.log(data);
            this.niveauQualificationCibles = data;
            console.log(this.niveauQualificationCibles);
            //this.isLoading = true;
        })
    }

    openNew() {
        this.niveauQualificationCible = {};
        this.submitted = false;
        this.niveauQualificationCibleDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.niveauQualificationCibleDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postNiveauQualificationCible() {
        this.submitted = true;

        if (this.niveauQualificationCible.libelle.trim()) {
            if (this.niveauQualificationCible.id) {
                this.niveauQualificationCibleService.updateNiveauQualificationCible(this.niveauQualificationCible.id,this.niveauQualificationCible).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.niveauQualificationCibleDialog = false;
                        this.niveauQualificationCible = {};
                        this.getAllNiveauQualificationCible();
                    },
                    error => {
                        console.log(error);
                    }
                );
                this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour Niveau de Qualification Ciblé", life: 3000});
            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.niveauQualificationCibleService.postNiveauQualificationCible(this.niveauQualificationCible).subscribe( data =>
                {
                    console.log(this.niveauQualificationCible);
                    //this.niveauSubject.next();
                    this.niveauQualificationCibleDialog = false;
                    this.getAllNiveauQualificationCible();
                    //this.annee=null;
                }),
                    this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Niveau de Qualification', life: 3000});
            }

            this.niveauQualificationCibles = [...this.niveauQualificationCibles];
            this.niveauQualificationCibleDialog = false;
            this.niveauQualificationCible = {};
        }
    }
    editNiveauQualificationCible(niveauQualificationCible: NiveauQualificationCible) {
        this.niveauQualificationCible = {...niveauQualificationCible};
        console.log(this.niveauQualificationCible.libelle)
        this.niveauQualificationCibleDialog = true;
    }

    deleteNiveauQualificationCible(niveauQualificationCible: NiveauQualificationCible) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + niveauQualificationCible.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.niveauQualificationCibles = this.niveauQualificationCibles.filter(val => val.id !== niveauQualificationCible.id);
                this.niveauQualificationCibleService.deleteNiveauQualificationCible(niveauQualificationCible.id).subscribe(data =>
                    {
                        this.getAllNiveauQualificationCible();
                    },
                    error => {
                        console.log(error);
                    });
                this.niveauQualificationCible = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Niveau de Qualification Ciblé Supprimé', life: 3000});
            }
        });
    }
    deleteSelectedNiveauQualificationCibles() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les niveaux sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.niveauQualificationCibles = this.niveauQualificationCibles.filter(val => !this.selectedNiveaux.includes(val));
                console.log(this.selectedNiveaux);
                this.niveauQualificationCibleService.deleteAllNiveauQualificationCible(this.selectedNiveaux).subscribe(data =>
                    {
                        this.getAllNiveauQualificationCible();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedNiveaux = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Niveau(x) d entre Supprimé(s)', life: 3000});
            }
        });
    }




}
