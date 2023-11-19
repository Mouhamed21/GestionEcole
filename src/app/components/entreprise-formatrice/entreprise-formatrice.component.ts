import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {EleveService} from "../../service/eleve.service";
import {EntrepriseFormatriceService} from "../../service/entreprise-formatrice.service";
import {EntrepriseFormatrice} from "../../modele/entrepriseFormatrice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entreprise-formatrice',
  templateUrl: './entreprise-formatrice.component.html',
  styleUrls: ['./entreprise-formatrice.component.scss'],
    providers: [EntrepriseFormatriceService,MessageService,ConfirmationService,EleveService]
})
export class EntrepriseFormatriceComponent implements OnInit {
    entrepriseFormatrices:any;
    entrepriseFormatrice: EntrepriseFormatrice;
    selectedEntrepriseFormatrices: any;
    submitted: boolean;
    entrepriseFormatriceDialog: boolean;
    //editNiveauEntreDialog: boolean;
    loading:boolean;
    erreur:boolean;
    tableau:boolean;
    constructor(private entrepriseFormatriceService: EntrepriseFormatriceService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
        this.getAllEntrepriseFormatrice();
  }

    public getAllEntrepriseFormatrice(){
        console.log('On Init ...');
        this.tableau=true;
        return this.entrepriseFormatriceService.getAllEntrepriseFormatrice().subscribe((data) =>
            {
                console.log(data);
                this.entrepriseFormatrices = data;
                if (this.entrepriseFormatrices.length==0){
                    this.tableau=false;
                }
                console.log(this.entrepriseFormatrices);
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
        this.entrepriseFormatrice = {};
        this.submitted = false;
        this.entrepriseFormatriceDialog = true;
        //this.editNiveauEntreDialog = true;
    }

    hideDialog() {
        this.entrepriseFormatriceDialog = false;
        this.submitted = false;
        //this.editNiveauEntreDialog = false;
    }

    public postEntrepriseFormatrice() {
        this.submitted = true;

        if (this.entrepriseFormatrice.libelle.trim()) {
            if (this.entrepriseFormatrice.id) {
                this.entrepriseFormatriceService.updateEntrepriseFormatrice(this.entrepriseFormatrice.id,this.entrepriseFormatrice).subscribe(
                    data => {
                        console.log(data);
                        console.log('modif');
                        this.entrepriseFormatriceDialog = false;
                        this.entrepriseFormatrice = {};
                        this.getAllEntrepriseFormatrice();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Mis à jour Entreprise Formatrice", life: 3000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une entreprise formatrice existante', life: 6000});
                    }
                );

            }
            else {
                //this.niveau.annee=this.annee.getFullYear().toString();
                this.entrepriseFormatriceService.postEntrepriseFormatrice(this.entrepriseFormatrice).subscribe( data =>
                    {
                        console.log(this.entrepriseFormatrice);
                        //this.niveauSubject.next();
                        this.entrepriseFormatriceDialog = false;
                        this.getAllEntrepriseFormatrice();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: "Ajout Entreprise Formatrice", life: 3000});

                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Vous ne pouvez pas ajouter une entreprise existante', life: 6000});
                    }
                )
            }

            this.entrepriseFormatrices = [...this.entrepriseFormatrices];
            this.entrepriseFormatriceDialog = false;
            this.entrepriseFormatrice = {};
        }
    }
    editEntrepriseFormatrice(entrepriseFormatrice: EntrepriseFormatrice) {
        this.entrepriseFormatrice = {...entrepriseFormatrice};
        console.log(this.entrepriseFormatrice.libelle);
        console.log(this.entrepriseFormatrice.adresse);
        this.entrepriseFormatriceDialog = true;
    }

    deleteEntrepriseFormatrice(entrepriseFormatrice: EntrepriseFormatrice) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + entrepriseFormatrice.libelle + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.entrepriseFormatrices = this.entrepriseFormatrices.filter(val => val.id !== entrepriseFormatrice.id);
                this.entrepriseFormatriceService.deleteEntrepriseFormatrice(entrepriseFormatrice.id).subscribe(data =>
                    {
                        this.getAllEntrepriseFormatrice();
                    },
                    error => {
                        console.log(error);
                    });
                this.entrepriseFormatrice = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Entreprise Formatrice Supprimé', life: 3000});
            }
        });
    }
    deleteSelectedEntrepriseFormatrice() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les niveaux sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.entrepriseFormatrices = this.entrepriseFormatrices.filter(val => !this.selectedEntrepriseFormatrices.includes(val));
                console.log(this.selectedEntrepriseFormatrices);
                this.entrepriseFormatriceService.deleteAllEntrepriseFormatrice(this.selectedEntrepriseFormatrices).subscribe(data =>
                    {
                        this.getAllEntrepriseFormatrice();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedEntrepriseFormatrices = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Entreprise(s) Formatrice(s) Supprimée(s)', life: 3000});
            }
        });
    }


}
