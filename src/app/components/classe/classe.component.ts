import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from "rxjs";
import {ConfirmationService, MenuItem} from 'primeng/api';
import { MessageService } from 'primeng/api';
import {ClasseService} from "../../service/classe.service";
import {Classe} from "../../modele/classe";
import {EleveService} from "../../service/eleve.service";
import {Eleve} from "../../modele/eleve";
import {Niveau} from "../../modele/niveau";
import {NiveauService} from "../../service/niveau.service";


@Component({
    selector: 'app-classe',
    templateUrl: './classe.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    styleUrls: ['./classe.component.scss'],
    providers: [ClasseService,MessageService,ConfirmationService,EleveService]
})
export class ClasseComponent implements OnInit {
    eleves: any;
    classes: any;
    classe: Classe;
    clas:any;
    elev:any;
    eleve: Eleve;
    submitted: boolean;
    classeDialog: boolean;
    editClasseDialog: boolean;
    eleveDialog:boolean;
    selectedClasses: any;
    isLoading:boolean;
    classeSubject = new Subject<void>();
    breadcrumbItems: MenuItem[];
    niveaux:any;
    niveau:Niveau;
    filteredNiveaux: Niveau[];
    filteredNiveau: Niveau[];
    nbrClasse:any;
    nbrClasseparNiveau:any;

    constructor(private classeService: ClasseService, private eleveService: EleveService, private niveauService:NiveauService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getClasses();

        this.getNiveaux();

        this.getEffectifClasses();


        this.eleveService.getEleves().subscribe(data => this.eleves = data);
    }

    public getClasses(){
        console.log('On Init ...');
        return this.classeService.getClasses().subscribe((data) =>
        {
            console.log(data);
            this.classes = data;
            this.isLoading = true;
            this.niveau = null;
        })
    }

    public getEffectifClasses(){
        return this.classeService.getEffectifClasses().subscribe( data =>
        {
            this.nbrClasse = data;
            console.log(this.nbrClasse);
        })
    }

    public getNombreClasseParNiveau(niveauId){
        return this.classeService.getNombreClasseParNiveau(niveauId).subscribe(data =>
        {
            this.nbrClasseparNiveau = data;
            console.log(this.nbrClasseparNiveau)
        })
    }

    public getClassesByNiveau(niveauId){
        return this.classeService.getClasseByNiveau(niveauId).subscribe(data =>{
            this.classes = data;
            console.log(this.classes);
            this.getNombreClasseParNiveau(niveauId);
        })
    }
    public getOneClasse(classe: Classe){
        return this.router.navigate(['/uikit/classe', classe.id]);
    }


    first = 0;

    rows = 10;


    openNew() {
        this.classe = {};
        this.submitted = false;
        this.classeDialog = true;
    }
    openEdit(cl:Classe) {
        console.log('dddd');
        this.clas=cl;
        console.log(this.clas);
        //this.classe = {};
        this.submitted = false;
        this.editClasseDialog = true;
    }
    // openEleve(cl:Classe) {
    //     console.log('eee');
    //     this.clas=cl;
    //     console.log(this.clas);
    //     this.submitted = false;
    //     this.eleveDialog = true;
    // }

    public getNiveaux(){
        console.log('On Init ...');
        return this.niveauService.getNiveaux().subscribe((data) =>
        {
            console.log(data);
            this.niveaux = data;
        })
    }

    editClasse(classe: Classe) {
        this.classe = {...classe};
        this.niveau = {...classe.niveau}
        //this.classeDialog = true;
        this.editClasseDialog=true;
    }
    public postClasse() {
        this.submitted = true;
        console.log(this.niveau)
        if (this.classe.nom.trim() && this.niveau) {
            if (this.classe.id) {
                this.classeService.updateClasse(this.classe.id,this.classe).subscribe(
                    data => {
                        console.log(data);
                        this.editClasseDialog = false;
                        this.classe = {};
                        this.getClasses();
                    },
                    error => {
                        console.log(error);
                    }
                );
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Classe', life: 3000});
            }
            else {
                this.classe.niveau = this.niveau;
                this.classeService.postClasse(this.classe).subscribe( data =>
                {
                        this.classe={};
                        console.log(this.classe);
                        this.classeSubject.next();
                        this.classeDialog = false;
                        //this.niveau=null;
                        this.getClasses();
                }),
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Classe', life: 3000});
            }
            this.classes = [...this.classes];
            this.classeDialog = false;
            this.editClasseDialog=false;
            this.classe = {};
            this.niveau=null;
        }
    }

    deleteClasse(classe: Classe) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + classe.nom + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.classes = this.classes.filter(val => val.id !== classe.id);
                this.classeService.deleteClasse(classe.id).subscribe(data =>
                    {
                        this.getClasses();
                    },
                    error => {
                        console.log(error);
                    });
                this.classe = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Classe Supprimée', life: 3000});
            }
        });
    }

    deleteSelectedClasses() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les classes sélectionnées?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.classes = this.classes.filter(val => !this.selectedClasses.includes(val));
                console.log(this.selectedClasses);
                this.classeService.deleteAllClasse(this.selectedClasses).subscribe(data =>
                    {
                        this.getClasses();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedClasses = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Classe(s) Supprimée(s)', life: 3000});
            }
        });
    }

    filterniveau(event) {
        const filtered: Niveau[] = [];
        const query = event.query;
        for (let i = 0; i < this.niveaux.length; i++) {
            const niveau = this.niveaux[i];
            if (this.classe.niveau.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(niveau);
            }
        }
        this.filteredNiveau = filtered;
    }

    filterNiveau(event) {
        const filter: Niveau[] = [];
        const query = event.query;
        for (let i = 0; i < this.niveaux.length; i++) {
            let clas = this.niveaux[i];
            if (clas.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(clas);
            }
        }
        this.filteredNiveaux = filter;
    }

    hideDialog() {
        this.classeDialog = false;
        this.submitted = false;
        this.editClasseDialog = false;
        this.niveau=null;
    }

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
        return this.classes ? this.first === (this.classes.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.classes ? this.first === 0 : true;
    }
}
