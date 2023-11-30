import { Component, OnInit } from '@angular/core';
import {Filiere} from "../../modele/Filiere";
import {Branche} from "../../modele/branche";
import {FiliereService} from "../../service/filiere.service";
import {Router} from "@angular/router";
import {BrancheComponent} from "../branche/branche.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {Secteur} from "../../modele/secteur";
import {FiliereComponent} from "../filiere/filiere.component";
import {SecteurComponent} from "../secteur/secteur.component";
import {MetierService} from "../../service/metier.service";
import {BrancheService} from "../../service/branche.service";
import {Metier} from "../../modele/metier";

@Component({
  selector: 'app-metier',
  templateUrl: './metier.component.html',
  styleUrls: ['./metier.component.scss'],
    providers: [MetierService,MessageService,ConfirmationService,BrancheComponent,FiliereComponent,SecteurComponent]
})
export class MetierComponent implements OnInit {

    metiers: any;
    metier: Metier;
    filieres:any;
    filiere:Filiere;
    secteurs:any;
    secteur:Secteur;
    selectedMetiers: any;
    submitted: boolean;
    metierDialog: boolean;
    filier:any
    secte:any;
    filteredFilieres: Filiere[];
    filteredSecteurs: Secteur[];
    constructor(private secteurComponent: SecteurComponent, private router: Router, private metierService: MetierService,
                private filiereComponent:FiliereComponent,private messageService: MessageService,
                private confirmationService: ConfirmationService,private brancheComponent:BrancheComponent) { }

    ngOnInit(): void {
        this.getAllMetier();
        this.filiereComponent.getFilieres();
        this.secteurComponent.getAllSecteur();

    }

    public getAllMetier(){
        console.log('On Init ...');
        return this.metierService.getAllMetier().subscribe((data) =>
        {
            console.log(data);
            this.metiers = data;
            console.log(this.metiers)
            this.filiere = null;
            this.secteur = null;
        })
    }
    openNew() {
        this.metier = {};
        this.submitted = false;
        this.metierDialog = true;
    }
    public postMetier() {
        this.submitted = true;
        console.log(this.metier)
        if (this.metier.libelle.trim() && this.filiere && this.secteur) {
            if (this.metier.id) {
                this.metierService.updateMetier(this.metier.id,this.metier).subscribe(
                    data => {
                        console.log(data);
                        this.metierDialog = false;
                        this.metier = {};
                        this.getAllMetier();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Metier', life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un metier existant', life: 6000});
                    }
                );
            }
            else {
                this.metier.filiere = this.filiere;
                this.metier.secteur = this.secteur;
                this.metierService.postMetier(this.metier).subscribe( data =>
                    {
                        this.metier={};
                        console.log(this.metier);
                        //this.classeSubject.next();
                        this.metierDialog = false;
                        //this.niveau=null;
                        this.getAllMetier();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Metier', life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un metier existant', life: 6000});
                    }
                )

            }
            this.metiers = [...this.metiers];
            this.metierDialog = false;
            //this.editClasseDialog=false;
            this.metier = {};
            this.filiere=null;
            this.secteur = null;
        }
    }

    editMetier(metier: Metier) {
        this.metier = {...metier};
        this.filiere = {...metier.filiere}
        this.secteur = {...metier.secteur}
        //this.classeDialog = true;
        this.metierDialog=true;
    }
    hideDialog() {
        this.metierDialog = false;
        this.submitted = false;
        // this.editClasseDialog = false;
        this.filiere=null;
        this.secteur=null;
    }

    deleteMetier(metier: Metier) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + metier.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.metiers = this.metiers.filter(val => val.id !== metier.id);
                this.metierService.deleteMetier(metier.id).subscribe(data =>
                    {
                        this.getAllMetier();
                    },
                    error => {
                        console.log(error);
                    });
                this.filiere = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Métier Supprimé', life: 3000});
            }
        });
    }

    deleteSelectedMetiers() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les metiers sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.filieres = this.filieres.filter(val => !this.selectedMetiers.includes(val));
                console.log(this.selectedMetiers);
                this.metierService.deleteAllMetier(this.selectedMetiers).subscribe(data =>
                    {
                        this.getAllMetier();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedMetiers = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Metier(s) Supprimé(s)', life: 3000});
            }
        });
    }

    filterFiliere(event) {
        const filter: Filiere[] = [];
        const query = event.query;
        for (let i = 0; i < this.filiereComponent.filieres.length; i++) {
            let filier = this.filiereComponent.filieres[i];
            if (filier.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(filier);
            }
        }
        this.filteredFilieres = filter;
    }

    filterSecteur(event) {
        const filter: Secteur[] = [];
        const query = event.query;
        for (let i = 0; i < this.secteurComponent.secteurs.length; i++) {
            let secte = this.secteurComponent.secteurs[i];
            if (secte.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(secte);
            }
        }
        this.filteredSecteurs = filter;
    }


}
