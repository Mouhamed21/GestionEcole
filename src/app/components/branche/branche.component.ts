import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {BrancheService} from "../../service/branche.service";

import {Router} from "@angular/router";
import {Branche} from "../../modele/branche";

@Component({
  selector: 'app-branche',
  templateUrl: './branche.component.html',
  styleUrls: ['./branche.component.scss'],
    providers: [BrancheService,MessageService,ConfirmationService]
})
export class BrancheComponent implements OnInit {

    branches:any;
    branche: Branche;
    selectedBranches: any;
    submitted: boolean;
    brancheDialog: boolean;
    // editQualificationCibleEntreDialog: boolean;
    loading:boolean;
    erreur:boolean;
    tableau:boolean;
    constructor(private brancheService: BrancheService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

    public getAllBranche(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;
        return this.brancheService.getAllBranche().subscribe((data) =>
            {
                console.log(data);
                this.branches = data;
                if (this.branches.length==0){
                    this.tableau=false;
                }
                console.log(this.branches);
                this.loading=false;
                this.erreur=false;
                //this.isLoading = true;
            },
            error => {
                this.loading=false;
                this.erreur=true;
            }
        )
    }

    openNew() {
        this.branche = {};
        this.submitted = false;
        this.brancheDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.brancheDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postBranche() {
        this.submitted = true;

        if (this.branche.libelle.trim()) {
            if (this.branche.id) {
                this.brancheService.updateBranche(this.branche.id,this.branche).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.brancheDialog = false;
                        this.branche = {};
                        this.getAllBranche();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour Branche", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une branche existante', life: 6000});
                    }
                );
            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.brancheService.postBranche(this.branche).subscribe( data =>
                    {
                        console.log(this.branche);
                        //this.niveauSubject.next();
                        this.brancheDialog = false;
                        this.getAllBranche();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Branche', life: 3000});
                        //this.annee=null;
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une branche existante', life: 6000});
                    }
                )

            }

            this.branches = [...this.branches];
            this.brancheDialog = false;
            this.branche = {};
        }
    }
    editBranche(branche: Branche) {
        this.branche = {...branche};
        console.log(this.branche.libelle)
        this.brancheDialog = true;
    }

    deleteBranche(branche: Branche) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + branche.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.branches = this.branches.filter(val => val.id !== branche.id);
                this.brancheService.deleteBranche(branche.id).subscribe(data =>
                    {
                        this.getAllBranche();
                    },
                    error => {
                        console.log(error);
                    });
                this.branche = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Branche Supprimée', life: 3000});
            }
        });
    }
    deleteSelectedBranches() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les niveaux sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.branches = this.branches.filter(val => !this.selectedBranches.includes(val));
                console.log(this.selectedBranches);
                this.brancheService.deleteAllBranche(this.selectedBranches).subscribe(data =>
                    {
                        this.getAllBranche();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedBranches = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Branche(x) Supprimée(s)', life: 3000});
            }
        });
    }

}
