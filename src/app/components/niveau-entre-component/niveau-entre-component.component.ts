import { Component, OnInit } from '@angular/core';
import {NiveauEntre} from "../../modele/niveauEntre";
import {EleveService} from "../../service/eleve.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {NiveauEntreService} from "../../service/niveau-entre.service";

@Component({
  selector: 'app-niveau-entre-component',
  templateUrl: './niveau-entre-component.component.html',
  styleUrls: ['./niveau-entre-component.component.scss'],
    providers: [NiveauEntreService,MessageService,ConfirmationService,EleveService]
})
export class NiveauEntreComponentComponent implements OnInit {
    niveauEntres:any;
    niveauEntre: NiveauEntre;
    selectedNiveaux: any;
    submitted: boolean;
    niveauEntreDialog: boolean;
    editNiveauEntreDialog: boolean;
    loading:boolean;
    erreur:boolean;
    tableau:boolean;
    constructor(private niveauEntreService: NiveauEntreService, private eleveService: EleveService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
        this.getAllNiveauEntre();
  }
    public getAllNiveauEntre(){
        console.log('On Init ...');
        this.tableau=true;
        return this.niveauEntreService.getAllNiveauEntre().subscribe((data) =>
        {
            console.log(data);
            this.niveauEntres = data;
            if (this.niveauEntres.length==0){
                this.tableau=false;
            }
            console.log(this.niveauEntres);
            //this.isLoading = true;
            this.loading=false;
            this.erreur=false;
        },
            error => {
                this.loading=false;
                this.erreur=true;
            }
            )
    }

    openNew() {
        this.niveauEntre = {};
        this.submitted = false;
        this.niveauEntreDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.niveauEntreDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postNiveauEntre() {
        this.submitted = true;

        if (this.niveauEntre.libelle.trim()) {
            if (this.niveauEntre.id) {
                this.niveauEntreService.updateNiveauEntre(this.niveauEntre.id,this.niveauEntre).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.niveauEntreDialog = false;
                        this.niveauEntre = {};
                        this.getAllNiveauEntre();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour Niveau d'entrée", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un niveau existant', life: 6000});
                    }
                );

            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.niveauEntreService.postNiveauEntre(this.niveauEntre).subscribe( data =>
                {
                    console.log(this.niveauEntre);
                    //this.niveauSubject.next();
                    this.niveauEntreDialog = false;
                    this.getAllNiveauEntre();
                    this.messageService.add({severity:'success', summary: 'Réussi', detail: "Ajout Niveau d'entrée", life: 3000});
                    //this.annee=null;
                },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un niveau existant', life: 6000});
                    }
                )
            }

            this.niveauEntres = [...this.niveauEntres];
            this.niveauEntreDialog = false;
            this.niveauEntre = {};
        }
    }
    editNiveauEntre(niveauEntre: NiveauEntre) {
        this.niveauEntre = {...niveauEntre};
        console.log(this.niveauEntre.libelle)
        this.niveauEntreDialog = true;
    }

    deleteNiveauEntre(niveauEntre: NiveauEntre) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + niveauEntre.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.niveauEntres = this.niveauEntres.filter(val => val.id !== niveauEntre.id);
                this.niveauEntreService.deleteNiveauEntre(niveauEntre.id).subscribe(data =>
                    {
                        this.getAllNiveauEntre();
                    },
                    error => {
                        console.log(error);
                    });
                this.niveauEntre = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Niveau Supprimé', life: 3000});
            }
        });
    }
    deleteSelectedNiveauEntre() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les niveaux sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.niveauEntres = this.niveauEntres.filter(val => !this.selectedNiveaux.includes(val));
                console.log(this.selectedNiveaux);
                this.niveauEntreService.deleteAllNiveauEntre(this.selectedNiveaux).subscribe(data =>
                    {
                        this.getAllNiveauEntre();
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
