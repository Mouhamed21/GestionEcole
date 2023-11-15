import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {CentreReference} from "../../modele/centreReference";
import {CentreReferenceService} from "../../service/centre-reference.service";
import {EleveService} from "../../service/eleve.service";

@Component({
  selector: 'app-centre-reference',
  templateUrl: './centre-reference.component.html',
  styleUrls: ['./centre-reference.component.scss'],
  providers: [CentreReferenceService,MessageService,ConfirmationService,EleveService]
})
export class CentreReferenceComponent implements OnInit {
        centreReferences:any;
        centreReference: CentreReference;
        selectedCCentreReferences: any;
        submitted: boolean;
        centreReferenceDialog: boolean;
       // editNiveauEntreDialog: boolean;
        loading:boolean;
        erreur:boolean;
        tableau:boolean;
        constructor(private centreReferenceService: CentreReferenceService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }


    ngOnInit(): void {
        this.getAllCentreReference();
  }

    public getAllCentreReference(){
        console.log('On Init ...');
        this.tableau=true;
        return this.centreReferenceService.getAllCentreReference().subscribe((data) =>
            {
                console.log(data);
                this.centreReferences = data;
                if (this.centreReferences.length==0){
                    this.tableau=false;
                }
                console.log(this.centreReferences);
                //this.isLoading = true;
                this.loading=false;
                this.erreur=false;
            },
            error => {
                this.loading=false;
                this.erreur=true;
            }
        )
    }

    openNew() {
        this.centreReference = {};
        this.submitted = false;
        this.centreReferenceDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.centreReferenceDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postCentreReference() {
        this.submitted = true;

        if (this.centreReference.libelle.trim()) {
            if (this.centreReference.id) {
                this.centreReferenceService.updateCentreReference(this.centreReference.id,this.centreReference).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.centreReferenceDialog = false;
                        this.centreReference = {};
                        this.getAllCentreReference();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour centre Reference", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un centre de Reference existant', life: 6000});
                    }
                );

            }
            else {
                this.centreReferenceService.postCentreReference(this.centreReference).subscribe( data =>
                    {
                        console.log(this.centreReference);
                        //this.niveauSubject.next();
                        this.centreReferenceDialog = false;
                        this.getAllCentreReference();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Ajout Centre de Reference", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter un centre de Référence existant', life: 6000});
                    })
            }

            this.centreReferences = [...this.centreReferences];
            this.centreReferenceDialog = false;
            this.centreReference = {};
        }
    }
    editCentreReference(centreReference: CentreReference) {
        this.centreReference = {...centreReference};
        console.log(this.centreReference.libelle)
        this.centreReferenceDialog = true;
    }

    deleteCentreReference(centreReference: CentreReference) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + centreReference.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.centreReferences = this.centreReferences.filter(val => val.id !== centreReference.id);
                this.centreReferenceService.deleteCentreReference(centreReference.id).subscribe(data =>
                    {
                        this.getAllCentreReference();
                    },
                    error => {
                        console.log(error);
                    });
                this.centreReference = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Centre de Reference Supprimé', life: 3000});
            }
        });
    }
    deleteSelectedCentreReference() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les niveaux sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.centreReferences = this.centreReferences.filter(val => !this.selectedCCentreReferences.includes(val));
                console.log(this.selectedCCentreReferences);
                this.centreReferenceService.deleteAllCentreReference(this.selectedCCentreReferences).subscribe(data =>
                    {
                        this.getAllCentreReference();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedCCentreReferences = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Centres de References Supprimés', life: 3000});
            }
        });
    }

    first = 0;

    rows = 10;

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.centreReferences ? this.first === (this.centreReferences.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.centreReferences ? this.first === 0 : true;
    }

}
