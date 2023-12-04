import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {FiliereService} from "../../service/filiere.service";
import {Router} from "@angular/router";
import {Filiere} from "../../modele/Filiere";
import {Branche} from "../../modele/branche";
import {BrancheService} from "../../service/branche.service";
import {BrancheComponent} from "../branche/branche.component";

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss'],
  providers: [FiliereService,MessageService,ConfirmationService,BrancheService,BrancheComponent]
})
export class FiliereComponent implements OnInit {
    filieres: any;
    filiere: Filiere;
    branches:any;
    branche:Branche;
    selectedFilieres: any;
    submitted: boolean;
    filiereDialog: boolean;
    branch:any
    filteredBranches: Branche[];
    constructor(private filiereService: FiliereService, private router: Router, private brancheComponent:BrancheComponent,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getFilieres();
    this.brancheComponent.getAllBranche();

  }

    public getFilieres(){
        console.log('On Init ...');
        return this.filiereService.getFilieres().subscribe((data) =>
        {
            console.log(data);
            this.filieres = data;
            this.branche = null;
        })
    }
    openNew() {
        this.filiere = {};
        this.submitted = false;
        this.filiereDialog = true;
    }
    public postFiliere() {
        this.submitted = true;
        console.log(this.branche)
        if (this.filiere.libelle.trim() && this.branche) {
            if (this.filiere.id) {
                this.filiere.branche = this.branche;
                this.filiereService.updateFiliere(this.filiere.id,this.filiere).subscribe(
                    data => {
                        console.log(data);
                        this.filiereDialog = false;
                        this.filiere = {};
                        this.getFilieres();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Filiere', life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une filiere existante', life: 6000});
                    }
                );
            }
            else {
                this.filiere.branche = this.branche;
                this.filiereService.postFiliere(this.filiere).subscribe( data =>
                {
                    this.filiere={};
                    console.log(this.filiere);
                    //this.classeSubject.next();
                    this.filiereDialog = false;
                    //this.niveau=null;
                    this.getFilieres();
                    this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Filiere', life: 3000});
                },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une filiere existante', life: 6000});
                    }
                )

            }
            this.filieres = [...this.filieres];
            this.filiereDialog = false;
            //this.editClasseDialog=false;
            this.filiere = {};
            this.branche=null;
        }
    }

    editFiliere(filiere: Filiere) {
        this.filiere = {...filiere};
        this.branche = {...filiere.branche}
        //this.classeDialog = true;
        this.filiereDialog=true;
    }
    hideDialog() {
        this.filiereDialog = false;
        this.submitted = false;
       // this.editClasseDialog = false;
        this.branche=null;
    }

    deleteFiliere(filiere: Filiere) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + filiere.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.filieres = this.filieres.filter(val => val.id !== filiere.id);
                this.filiereService.deleteFiliere(filiere.id).subscribe(data =>
                    {
                        this.getFilieres();
                    },
                    error => {
                        console.log(error);
                    });
                this.filiere = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Filiere Supprimée', life: 3000});
            }
        });
    }

    deleteSelectedFilieres() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les filieres sélectionnées?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.filieres = this.filieres.filter(val => !this.selectedFilieres.includes(val));
                console.log(this.selectedFilieres);
                this.filiereService.deleteAllFiliere(this.selectedFilieres).subscribe(data =>
                    {
                        this.getFilieres();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedFilieres = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Filiere(s) Supprimée(s)', life: 3000});
            }
        });
    }

    filterBranche(event) {
        const filter: Branche[] = [];
        const query = event.query;
        for (let i = 0; i < this.brancheComponent.branches.length; i++) {
            let branch = this.brancheComponent.branches[i];
            if (branch.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(branch);
            }
        }
        this.filteredBranches = filter;
    }
}
