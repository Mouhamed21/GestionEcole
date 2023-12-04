import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Region} from "../../modele/region";
import {Departement} from "../../modele/Departement";
import {RegionService} from "../../service/region.service";
import {BrancheService} from "../../service/branche.service";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
    providers: [RegionService,MessageService,ConfirmationService,BrancheService]
})
export class RegionComponent implements OnInit {

    regions: any;
    region: Region;
    departements:any;
    departement:Departement;
    selectedRegions: any;
    submitted: boolean;
    regionDialog: boolean;
    loading:boolean;
    erreur:boolean;
    tableau:boolean;
    constructor(private regionService: RegionService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getAllRegion();
        //this.departementComponent.getAllDepartement();

    }

    public getAllRegion(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;
        return this.regionService.getAllRegion().subscribe((data) =>
            {
                console.log(data);
                this.regions = data;
                if (this.regions.length==0){
                    this.tableau=false;
                }
                console.log(this.regions);
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
        this.region = {};
        this.submitted = false;
        this.regionDialog = true;
    }
    public postRegion() {
        this.submitted = true;
        console.log(this.departement)
        if (this.region.libelle.trim() && this.getAllRegion) {
            if (this.region.id) {
                //this.region.departement = this.departement;
                this.regionService.updateRegion(this.region.id,this.region).subscribe(
                    data => {
                        console.log(data);
                        this.regionDialog = false;
                        this.region = {};
                        this.getAllRegion();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Region', life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une region existante', life: 6000});
                    }
                );
            }
            else {
                //this.region.departement = this.departement;
                this.regionService.postRegion(this.region).subscribe( data =>
                    {
                        this.region={};
                        console.log(this.region);
                        //this.classeSubject.next();
                        this.regionDialog = false;
                        //this.niveau=null;
                        this.getAllRegion();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Region', life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une region existante', life: 6000});
                    }
                )

            }
            this.regions = [...this.regions];
            this.regionDialog = false;
            //this.editClasseDialog=false;
            this.region = {};
           // this.departement=null;
        }
    }

    editRegion(region: Region) {
        this.region = {...region};
        //this.departement = {...region.departement}
        //this.classeDialog = true;
        this.regionDialog=true;
    }
    hideDialog() {
        this.regionDialog = false;
        this.submitted = false;
        // this.editClasseDialog = false;
       // this.departement=null;
    }

    deleteRegion(region: Region) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + region.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.regions = this.regions.filter(val => val.id !== region.id);
                this.regionService.deleteRegion(region.id).subscribe(data =>
                    {
                        this.getAllRegion();
                    },
                    error => {
                        console.log(error);
                    });
                this.region = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Region Supprimée', life: 3000});
            }
        });
    }

    deleteSelectedRegions() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les regions sélectionnées?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.regions = this.regions.filter(val => !this.selectedRegions.includes(val));
                console.log(this.selectedRegions);
                this.regionService.deleteAllRegion(this.selectedRegions).subscribe(data =>
                    {
                        this.getAllRegion();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedRegions = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Region(s) Supprimée(s)', life: 3000});
            }
        });
    }



}
