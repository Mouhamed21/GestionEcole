import { Component, OnInit } from '@angular/core';
import {Secteur} from "../../modele/secteur";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {ObservationService} from "../../service/observation.service";
import {Observation} from "../../modele/observation";

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss'],
  providers: [ObservationService,MessageService,ConfirmationService]
})
export class ObservationComponent implements OnInit {

    observations:any;
    observation: Secteur;
    selectedObservations: any;
    submitted: boolean;
    observationDialog: boolean;
    // editQualificationCibleEntreDialog: boolean;
    loading:boolean;
    erreur:boolean;
    tableau:boolean;
    constructor(private observationService: ObservationService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }
    ngOnInit(): void {
        this.getAllObservation();
    }
    public getAllObservation(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;
        return this.observationService.getAllObservation().subscribe((data) =>
            {
                console.log(data);
                this.observations = data;
                if (this.observations.length==0){
                    this.tableau=false;
                }
                console.log(this.observations);
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
        this.observation = {};
        this.submitted = false;
        this.observationDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.observationDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postObservation() {
        this.submitted = true;

        if (this.observation.libelle.trim()) {
            if (this.observation.id) {
                this.observationService.updateObservation(this.observation.id,this.observation).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.observationDialog = false;
                        this.observation = {};
                        this.getAllObservation();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour Observation", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une observation existante', life: 6000});
                    }
                );
            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.observationService.postObservation(this.observation).subscribe( data =>
                    {
                        console.log(this.observation);
                        //this.niveauSubject.next();
                        this.observationDialog = false;
                        this.getAllObservation();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Observation', life: 3000});
                        //this.annee=null;
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une observation existante', life: 6000});
                    }
                )

            }

            this.observations = [...this.observations];
            this.observationDialog = false;
            this.observation = {};
        }
    }
    editObservation(observation: Observation) {
        this.observation = {...observation};
        console.log(this.observation.libelle)
        this.observationDialog = true;
    }

    deleteObservation(observation: Observation) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + observation.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.observations = this.observations.filter(val => val.id !== observation.id);
                this.observationService.deleteObservation(observation.id).subscribe(data =>
                    {
                        this.getAllObservation();
                    },
                    error => {
                        console.log(error);
                    });
                this.observation = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Observation Supprimée', life: 3000});
            }
        });
    }
    deleteSelectedObservations() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les observations sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.observations = this.observations.filter(val => !this.selectedObservations.includes(val));
                console.log(this.selectedObservations);
                this.observationService.deleteAllObservation(this.selectedObservations).subscribe(data =>
                    {
                        this.getAllObservation();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedObservations = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Observation(s) Supprimé(s)', life: 3000});
            }
        });
    }

}
