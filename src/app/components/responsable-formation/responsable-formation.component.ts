import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ResponsableFormationService} from "../../service/responsable-formation.service";
import {Router} from "@angular/router";
import {ResponsableFormation} from "../../modele/responsableFormation";

@Component({
  selector: 'app-responsable-formation',
  templateUrl: './responsable-formation.component.html',
  styleUrls: ['./responsable-formation.component.scss'],
    providers: [ResponsableFormationService,MessageService,ConfirmationService]
})
export class ResponsableFormationComponent implements OnInit {


    responsableFormations:any;
    responsableFormation: ResponsableFormation;
    selectedResponsableFormations: any;
    submitted: boolean;
    responsableFormationDialog: boolean;
    // editQualificationCibleEntreDialog: boolean;
    loading:boolean;
    erreur:boolean;
    tableau:boolean;
    constructor(private responsableFormationService: ResponsableFormationService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }
    ngOnInit(): void {
        this.getAllResponsableFormation();
    }
    public getAllResponsableFormation(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;
        return this.responsableFormationService.getAllResponsableFormation().subscribe((data) =>
            {
                console.log(data);
                this.responsableFormations = data;
                if (this.responsableFormations.length==0){
                    this.tableau=false;
                }
                console.log(this.responsableFormations);
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
        this.responsableFormation = {};
        this.submitted = false;
        this.responsableFormationDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.responsableFormationDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postResponsableFormation() {
        this.submitted = true;

        if (this.responsableFormation.nom.trim() && this.responsableFormation.prenom.trim()) {
            if (this.responsableFormation.id) {
                this.responsableFormationService.updateResponsableFormation(this.responsableFormation.id,this.responsableFormation).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.responsableFormationDialog = false;
                        this.responsableFormation = {};
                        this.getAllResponsableFormation();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour Responsable de Formation", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un Responsable de Formation existant', life: 6000});
                    }
                );
            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.responsableFormationService.postResponsableFormation(this.responsableFormation).subscribe( data =>
                    {

                        console.log(this.responsableFormation);
                        //this.niveauSubject.next();
                        this.responsableFormationDialog = false;
                        this.getAllResponsableFormation();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Responsable de Formation', life: 3000});
                        //this.annee=null;
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un Responsable de Formation existant', life: 6000});
                    }
                )

            }

            this.responsableFormations = [...this.responsableFormations];
            this.responsableFormationDialog = false;
            this.responsableFormation = {};
        }
    }
    editResponsableFormation(responsableFormation: ResponsableFormation) {
        this.responsableFormation = {...responsableFormation};
        console.log(this.responsableFormation)
        this.responsableFormationDialog = true;
    }

    deleteResponsableFormation(responsableFormation: ResponsableFormation) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + responsableFormation.prenom + ' ' +responsableFormation.nom+ ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.responsableFormations = this.responsableFormations.filter(val => val.id !== responsableFormation.id);
                this.responsableFormationService.deleteResponsableFormation(responsableFormation.id).subscribe(data =>
                    {
                        this.getAllResponsableFormation();
                    },
                    error => {
                        console.log(error);
                    });
                this.responsableFormation = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Responsable Formation Supprimé', life: 3000});
            }
        });
    }
    deleteSelectedResponsableFormation() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les responsables sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.responsableFormations = this.responsableFormations.filter(val => !this.selectedResponsableFormations.includes(val));
                console.log(this.selectedResponsableFormations);
                this.responsableFormationService.deleteAllResponsableFormation(this.selectedResponsableFormations).subscribe(data =>
                    {
                        this.getAllResponsableFormation();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedResponsableFormations = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Responsable Formation(x) Supprimé(s)', life: 3000});
            }
        });
    }

}
