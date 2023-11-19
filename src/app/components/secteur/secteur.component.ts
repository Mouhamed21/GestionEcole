import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {SecteurService} from "../../service/secteur.service";
import {Secteur} from "../../modele/secteur";
import {Router} from "@angular/router";

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.scss'],
    providers: [SecteurService,MessageService,ConfirmationService]
})
export class SecteurComponent implements OnInit {

    secteurs:any;
    secteur: Secteur;
    selectedSecteurs: any;
    submitted: boolean;
    secteurDialog: boolean;
   // editQualificationCibleEntreDialog: boolean;
    loading:boolean;
    erreur:boolean;
    tableau:boolean;
    constructor(private secteurService: SecteurService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.getAllSecteur();
  }
    public getAllSecteur(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;
        return this.secteurService.getAllSecteur().subscribe((data) =>
            {
                console.log(data);
                this.secteurs = data;
                if (this.secteurs.length==0){
                    this.tableau=false;
                }
                console.log(this.secteurs);
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
        this.secteur = {};
        this.submitted = false;
        this.secteurDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.secteurDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postSecteur() {
        this.submitted = true;

        if (this.secteur.libelle.trim()) {
            if (this.secteur.id) {
                this.secteurService.updateSecteur(this.secteur.id,this.secteur).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.secteurDialog = false;
                        this.secteur = {};
                        this.getAllSecteur();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour Secteur", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un secteur existant', life: 6000});
                    }
                );
            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.secteurService.postSecteur(this.secteur).subscribe( data =>
                    {
                        console.log(this.secteur);
                        //this.niveauSubject.next();
                        this.secteurDialog = false;
                        this.getAllSecteur();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Secteur', life: 3000});
                        //this.annee=null;
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un secteur existant', life: 6000});
                    }
                )

            }

            this.secteurs = [...this.secteurs];
            this.secteurDialog = false;
            this.secteur = {};
        }
    }
    editSecteur(secteur: Secteur) {
        this.secteur = {...secteur};
        console.log(this.secteur.libelle)
        this.secteurDialog = true;
    }

    deleteSecteur(secteur: Secteur) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + secteur.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.secteurs = this.secteurs.filter(val => val.id !== secteur.id);
                this.secteurService.deleteSecteur(secteur.id).subscribe(data =>
                    {
                        this.getAllSecteur();
                    },
                    error => {
                        console.log(error);
                    });
                this.secteur = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Secteur Supprimé', life: 3000});
            }
        });
    }
    deleteSelectedSecteurs() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les niveaux sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.secteurs = this.secteurs.filter(val => !this.selectedSecteurs.includes(val));
                console.log(this.selectedSecteurs);
                this.secteurService.deleteAllSecteur(this.selectedSecteurs).subscribe(data =>
                    {
                        this.getAllSecteur();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedSecteurs = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Secteur(x) Supprimé(s)', life: 3000});
            }
        });
    }

}
