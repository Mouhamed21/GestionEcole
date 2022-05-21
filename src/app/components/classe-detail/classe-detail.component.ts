import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EleveService} from "../../service/eleve.service";
import {ClasseService} from "../../service/classe.service";
import {Classe} from "../../modele/classe";
import {ConfirmationService, MessageService} from "primeng/api";
import {Eleve} from "../../modele/eleve";

@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.component.html',
  styleUrls: ['./classe-detail.component.scss'],
    providers: [ClasseService,MessageService,ConfirmationService,EleveService]
})
export class ClasseDetailComponent implements OnInit {
    public classeId;
    eleves:any;
    eleve:Eleve;
    classe = new Classe;
    submitted: boolean;
    eleveDialog: boolean;
    selectedEleves: any;
    editEleveDialog:boolean;
    elev:Eleve;
    nbrEleves:any;
  constructor(private route: ActivatedRoute, private eleveService: EleveService, private classeService: ClasseService, private router: Router,
              private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.classeId = id;
      this.getElevesByClasse(id);
      this.getClasseById(id);
      this.getEffectifClasse(id);
  }
    public getElevesByClasse(classeId){
        return this.eleveService.getElevesByClasse(classeId).subscribe((data) =>
        {
            this.eleves = data;
            console.log(this.eleves);
        })
    }
    public getEffectifClasse(classeId){
        return this.eleveService.getEffectifClasse(classeId).subscribe((data) =>
        {
            this.nbrEleves = data;
            console.log(this.nbrEleves);
        })
    }

    public RetourClasses(){
        return this.router.navigate(['/uikit/classe']);
  }

    public getClasseById(classeId){
        return this.classeService.getClasseById(classeId).subscribe((data) =>
        {
            this.classe = data;
            console.log(this.classe);
        })
    }



    first = 0;

    rows = 10;

    public postEleve(){
        this.classe.eleves=[];
        console.log(this.classe);
        this.eleve.classe = this.classe;
        console.log(this.eleve);
        return this.eleveService.postEleve(this.eleve).subscribe( data =>
            {
                console.log(this.classeId);
                this.eleve = {};
                this.eleveDialog = false;
                this.getElevesByClasse(this.classeId);
            },
            error => {
                console.log(error);
            });
    }
    openNewest() {
        this.eleve = {};
        this.submitted = false;
        this.eleveDialog = true;
    }
    openEditEleve(el:Eleve) {

        this.elev=el;
        console.log(this.elev);
        //this.classe = {};
        this.submitted = false;
        this.editEleveDialog = true;
    }

    public updateEleve(id:number, eleve: Eleve) {
        return this.eleveService.updateEleve(id,eleve).subscribe(
            data => {
                console.log(data);
                this.editEleveDialog = false;
                this.eleve = {};
                this.getElevesByClasse(this.classeId);
            },
            error => {
                console.log(error);
            }
        );
    }
    hideDialog() {
        this.eleveDialog = false;
        this.submitted = false;
        this.editEleveDialog = false;
       // this.editClasseDialog = false;
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    isLastPage(): boolean {
        return this.eleves ? this.first === (this.eleves.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.eleves ? this.first === 0 : true;
    }

    deleteEleve(eleve: Eleve) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + eleve.prenom + ' ' +eleve.nom +' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.eleves = this.eleves.filter(val => val.id !== eleve.id);
                this.eleveService.deleteEleve(eleve.id).subscribe();
                this.eleve = {};
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Eleve Supprimé', life: 3000});
            }
        });
    }

    deleteSelectedEleves() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les eleves sélectionnés',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.eleves = this.eleves.filter(val => !this.selectedEleves.includes(val));
                console.log(this.selectedEleves);
                this.eleveService.deleteAllEleves(this.selectedEleves).subscribe();
                this.selectedEleves = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Eleve(s) Supprimé(s)', life: 3000});
            }
        });
    }
}
