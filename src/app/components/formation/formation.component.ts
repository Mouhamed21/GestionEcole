import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Formation} from "../../modele/formation";
import {ResponsableFormation} from "../../modele/responsableFormation";
import {FormationService} from "../../service/formation.service";
import {ResponsableFormationComponent} from "../responsable-formation/responsable-formation.component";
import {BrancheService} from "../../service/branche.service";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
    providers: [FormationService,MessageService,ConfirmationService,BrancheService,ResponsableFormationComponent]
})
export class FormationComponent implements OnInit {

    formations: any;
    formation: Formation;
    responsableFormations:any;
    responsableFormation:ResponsableFormation;
    selectedFormations: any;
    submitted: boolean;
    formationDialog: boolean;
    format:any
    filteredResponsableFormations: ResponsableFormation[];
    dateJour: Date = new Date();
    constructor(private formationService: FormationService, private router: Router, private responsableFormationComponent:ResponsableFormationComponent,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getAllFormation();
        this.responsableFormationComponent.getAllResponsableFormation();

    }

    public getAllFormation(){
        console.log('On Init ...');
        return this.formationService.getAllFormation().subscribe((data) =>
        {
            console.log(data);
            this.formations = data;
            this.responsableFormation = null;
        })
    }
    updatedate(event) {
        this.formation.dateDebut = new Date(event);
    }
    openNew() {
        this.formation = {};
        this.submitted = false;
        this.formationDialog = true;
    }
    public postFormation() {
        this.submitted = true;
        console.log(this.responsableFormation)
        if (this.formation.libelle.trim() && this.formation.dateDebut.toString().trim() && this.responsableFormation) {
            if (this.formation.id) {
                this.formation.responsableFormation = this.responsableFormation;
                this.formationService.updateFormation(this.formation.id,this.formation).subscribe(
                    data => {
                        console.log(data);

                        console.log(this.formation)
                        this.formationDialog = false;
                        this.formation = {};
                        this.getAllFormation();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Formation', life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une formation existante', life: 6000});
                    }
                );
            }
            else {
                //debugger
                console.log(this.formation)
                this.formation.responsableFormation = this.responsableFormation;
                this.formationService.postFormation(this.formation).subscribe( data =>
                    {
                        console.log(this.formation)
                        this.formation={};
                        console.log(this.formation);
                        //this.classeSubject.next();
                        this.formationDialog = false;
                        //this.niveau=null;
                        this.getAllFormation();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Formation', life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une formation existante', life: 6000});
                    }
                )

            }
            this.formations = [...this.formations];
            this.formationDialog = false;
            //this.editClasseDialog=false;
            this.formation = {};
            this.responsableFormation=null;
        }
    }

    editFormation(formation: Formation) {
        //debugger
        this.formation = {...formation};
        this.responsableFormation = {...formation.responsableFormation}
        //this.classeDialog = true;
        this.formationDialog=true;
    }
    hideDialog() {
        this.formationDialog = false;
        this.submitted = false;
        // this.editClasseDialog = false;
        this.responsableFormation=null;
    }

    deleteFormation(formation: Formation) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + formation.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.formations = this.formations.filter(val => val.id !== formation.id);
                this.formationService.deleteFormation(formation.id).subscribe(data =>
                    {
                        this.getAllFormation();
                    },
                    error => {
                        console.log(error);
                    });
                this.formation = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Formation Supprimée', life: 3000});
            }
        });
    }

    deleteSelectedFormations() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les filieres sélectionnées?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.formations = this.formations.filter(val => !this.selectedFormations.includes(val));
                console.log(this.selectedFormations);
                this.formationService.deleteAllFormation(this.formations).subscribe(data =>
                    {
                        this.getAllFormation();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedFormations = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Formation(s) Supprimée(s)', life: 3000});
            }
        });
    }

    filterResponsableFormation(event) {
        const filter: Formation[] = [];
        const query = event.query;
        for (let i = 0; i < this.responsableFormationComponent.responsableFormations.length; i++) {
            let format = this.responsableFormationComponent.responsableFormations[i];
            if (format.prenom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(format);
            }
        }
        this.filteredResponsableFormations = filter;
    }

}
