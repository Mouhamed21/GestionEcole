import { Component, OnInit } from '@angular/core';
import {ClasseService} from "../../service/classe.service";
import {EleveService} from "../../service/eleve.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {NiveauService} from "../../service/niveau.service";
import {Niveau} from "../../modele/niveau";
import {Subject} from "rxjs";
import {Classe} from "../../modele/classe";

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss'],
  providers: [NiveauService,MessageService,ConfirmationService,EleveService]
})
export class NiveauComponent implements OnInit {
    isLoading:boolean;
    niveaux:any;
    niveau: Niveau;
    selectedNiveaux: any;
    submitted: boolean;
    niveauDialog: boolean;
    editNiveauDialog: boolean;
    niveauSubject = new Subject<void>();
    annee:Date;
    annee1:String;

    constructor(private niveauService: NiveauService, private eleveService: EleveService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
        this.getNiveaux();

  }
    public getNiveaux(){
        console.log('On Init ...');
        return this.niveauService.getNiveaux().subscribe((data) =>
        {
            console.log(data);
            this.niveaux = data;
            this.isLoading = true;
        })
    }

    openNew() {
        this.niveau = {};
        this.submitted = false
        this.niveauDialog = true;
        this.editNiveauDialog = true;
    }

    hideDialog() {
        this.niveauDialog = false;
        this.submitted = false;
        this.editNiveauDialog = false;
        this.annee=null;
    }

    editNiveau(niveau: Niveau) {
        this.niveau = {...niveau};
        //this.annee.getFullYear().toString();
        // @ts-ignore
        this.annee=this.niveau.annee
        console.log(typeof this.annee);
        this.annee = new Date(this.annee);
        console.log(typeof this.annee);
       // this.annee=this.niveau.annee;
        console.log(this.annee);

        console.log(this.niveau.nom)
        console.log(this.niveau.annee)
        //this.annee = {...niveau.annee}
        this.niveauDialog = true;
    }

    public postNiveau() {
        this.submitted = true;

        this.niveau.annee=this.annee.getFullYear().toString();
        console.log(this.niveau.annee);

        //this.niveau.annee=this.annee.getFullYear();

        if (this.niveau.nom.trim()) {
            if (this.niveau.id) {
                this.niveauService.updateNiveau(this.niveau.id,this.niveau).subscribe(
                    data => {
                        console.log(data);
                        this.editNiveauDialog = false;
                        this.niveau = {};
                        this.getNiveaux();
                    },
                    error => {
                        console.log(error);
                    }
                );
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Niveau', life: 3000});
            }
            else {
                this.niveau.annee=this.annee.getFullYear().toString();
                this.niveauService.postNiveau(this.niveau).subscribe( data =>
                {
                    console.log(this.niveau);
                    this.niveauSubject.next();
                    this.niveauDialog = false;
                    this.getNiveaux();
                    this.annee=null;
                }),
                    this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Classe', life: 3000});
            }

            this.niveaux = [...this.niveaux];
            this.niveauDialog = false;
            this.annee=null;
            this.niveau = {};
        }
    }

    deleteNiveau(niveau: Niveau) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + niveau.nom + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.niveaux = this.niveaux.filter(val => val.id !== niveau.id);
                this.niveauService.deleteNiveau(niveau.id).subscribe(data =>
                    {
                        this.getNiveaux();
                    },
                    error => {
                        console.log(error);
                    });
                this.niveau = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Niveau Supprimé', life: 3000});
            }
        });
    }

    deleteSelectedNiveaux() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les niveaux sélectionnés?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.niveaux = this.niveaux.filter(val => !this.selectedNiveaux.includes(val));
                console.log(this.selectedNiveaux);
                this.niveauService.deleteAllNiveau(this.selectedNiveaux).subscribe(data =>
                    {
                        this.getNiveaux();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedNiveaux = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Niveau(x) Supprimée(s)', life: 3000});
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
        return this.niveaux ? this.first === (this.niveaux.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.niveaux ? this.first === 0 : true;
    }
}
