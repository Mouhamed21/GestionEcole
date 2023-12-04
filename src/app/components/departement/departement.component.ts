import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {DepartementService} from "../../service/departement.service";
import {Departement} from "../../modele/Departement";
import {Region} from "../../modele/region";
import {RegionComponent} from "../region/region.component";

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss'],
  providers: [DepartementService,MessageService,ConfirmationService,RegionComponent]
})
export class DepartementComponent implements OnInit {

    departements:any;
    departement: Departement;
    selecteDepartements: any;
    submitted: boolean;
    regions:any;
    region:Region;
    departementDialog: boolean;
    regi:any
    filteredRegions: Region[];
    // editQualificationCibleEntreDialog: boolean;
    loading:boolean;
    erreur:boolean;
    tableau:boolean;

    constructor(private departementService: DepartementService, private router: Router,private regionComponent:RegionComponent,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllDepartement();
    this.regionComponent.getAllRegion();
  }

    public getAllDepartement(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;
        return this.departementService.getAllDepartement().subscribe((data) =>
            {
                console.log(data);
                this.departements = data;
                this.region = null;
                if (this.departements.length==0){
                    this.tableau=false;
                }
                console.log(this.departements);
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
        this.departement = {};
        this.submitted = false;
        this.departementDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.departementDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postDepartement() {
        this.submitted = true;

        if (this.departement.libelle.trim()) {
            if (this.departement.id) {
                this.departement.region = this.region;
                this.departementService.updateDepartement(this.departement.id,this.departement).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.departementDialog = false;
                        this.departement = {};
                        this.getAllDepartement();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour Departement", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un déparetement existant', life: 6000});
                    }
                );
            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.departement.region = this.region;
                this.departementService.postDepartement(this.departement).subscribe( data =>
                    {
                        console.log(this.departement);
                        //this.niveauSubject.next();
                        this.departementDialog = false;
                        this.getAllDepartement();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Departement', life: 3000});
                        //this.annee=null;
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un departement existant', life: 6000});
                    }
                )
            }

            this.departements = [...this.departements];
            this.departementDialog = false;
            this.departement = {};
        }
    }
    editDepartement(departement: Departement) {
        this.departement = {...departement};
        this.region = {...departement.region}
        console.log(this.departement.libelle)
        this.departementDialog = true;
    }

    deleteDepartement(departement: Departement) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + departement.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.departements = this.departements.filter(val => val.id !== departement.id);
                this.departementService.deleteDepartement(departement.id).subscribe(data =>
                    {
                        this.getAllDepartement();
                    },
                    error => {
                        console.log(error);
                    });
                this.departement = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Departement Supprimé', life: 3000});
            }
        });
    }
    deleteSelectedDepartement() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les departements sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.departements = this.departements.filter(val => !this.selecteDepartements.includes(val));
                console.log(this.selecteDepartements);
                this.departementService.deleteAllDepartement(this.selecteDepartements).subscribe(data =>
                    {
                        this.getAllDepartement();
                    },
                    error => {
                        console.log(error);
                    });
                this.selecteDepartements = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Département(x) Supprimé(s)', life: 3000});
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
