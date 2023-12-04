import { Component, OnInit } from '@angular/core';
import {Region} from "../../modele/region";
import {Router} from "@angular/router";
import {RegionComponent} from "../region/region.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {InspectionAcademie} from "../../modele/inspectionAcademie";
import {InspectionAcademieService} from "../../service/inspection-academie.service";

@Component({
  selector: 'app-inspection-academie',
  templateUrl: './inspection-academie.component.html',
  styleUrls: ['./inspection-academie.component.scss'],
    providers: [InspectionAcademieService,MessageService,ConfirmationService,RegionComponent]
})
export class InspectionAcademieComponent implements OnInit {

    inspectionAcademies:any;
    inspectionAcademie: InspectionAcademie;
    selecteInspectionAcademies: any;
    submitted: boolean;
    regions:any;
    region:Region;
    inspectionAcademiesDialog: boolean;
    regi:any
    filteredRegions: Region[];
    // editQualificationCibleEntreDialog: boolean;
    loading:boolean;
    erreur:boolean;
    tableau:boolean;

    constructor(private inspectionAcademieService: InspectionAcademieService, private router: Router,private regionComponent:RegionComponent,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getAllInspectionAcademie();
        this.regionComponent.getAllRegion();
    }

    public getAllInspectionAcademie(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;
        return this.inspectionAcademieService.getAllInspectionAcademie().subscribe((data) =>
            {
                console.log(data);
                this.inspectionAcademies = data;
                this.region = null;
                if (this.inspectionAcademies.length==0){
                    this.tableau=false;
                }
                console.log(this.inspectionAcademies);
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
        this.inspectionAcademie = {};
        this.submitted = false;
        this.inspectionAcademiesDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.inspectionAcademiesDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postInspectionAcademie() {
        this.submitted = true;

        if (this.inspectionAcademie.libelle.trim()) {
            if (this.inspectionAcademie.id) {
                this.inspectionAcademie.region = this.region;
                this.inspectionAcademieService.updateInspectionAcademie(this.inspectionAcademie.id,this.inspectionAcademie).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.inspectionAcademiesDialog = false;
                        this.inspectionAcademie = {};
                        this.getAllInspectionAcademie();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour Inspection", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une inspection existante', life: 6000});
                    }
                );
            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.inspectionAcademie.region = this.region;
                this.inspectionAcademieService.postInspectionAcademie(this.inspectionAcademie).subscribe( data =>
                    {
                        console.log(this.inspectionAcademie);
                        //this.niveauSubject.next();
                        this.inspectionAcademiesDialog = false;
                        this.getAllInspectionAcademie();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Inspection', life: 3000});
                        //this.annee=null;
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une inspection existante', life: 6000});
                    }
                )
            }

            this.inspectionAcademies = [...this.inspectionAcademies];
            this.inspectionAcademiesDialog = false;
            this.inspectionAcademie = {};
        }
    }
    editInspectionAcademie(inspectionAcademie: InspectionAcademie) {
        this.inspectionAcademie = {...inspectionAcademie};
        this.region = {...inspectionAcademie.region}
        console.log(this.inspectionAcademie.libelle)
        this.inspectionAcademiesDialog = true;
    }

    deleteInspectionAcademie(inspectionAcademie: InspectionAcademie) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + inspectionAcademie.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.inspectionAcademies = this.inspectionAcademies.filter(val => val.id !== inspectionAcademie.id);
                this.inspectionAcademieService.deleteInspectionAcademie(inspectionAcademie.id).subscribe(data =>
                    {
                        this.getAllInspectionAcademie();
                    },
                    error => {
                        console.log(error);
                    });
                this.inspectionAcademie = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Inspection Supprimé', life: 3000});
            }
        });
    }
    deleteSelectedInspectionAcademie() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les inspections sélectionnées?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.inspectionAcademies = this.inspectionAcademies.filter(val => !this.selecteInspectionAcademies.includes(val));
                console.log(this.selecteInspectionAcademies);
                this.inspectionAcademieService.deleteAllInspectionAcademie(this.selecteInspectionAcademies).subscribe(data =>
                    {
                        this.getAllInspectionAcademie();
                    },
                    error => {
                        console.log(error);
                    });
                this.selecteInspectionAcademies = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Inspection(s) Supprimée(s)', life: 3000});
            }
        });
    }
    filterRegion(event) {
        const filter: Region[] = [];
        const query = event.query;
        for (let i = 0; i < this.regionComponent.regions.length; i++) {
            let regi = this.regionComponent.regions[i];
            if (regi.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(regi);
            }
        }
        this.filteredRegions = filter;
    }

}
