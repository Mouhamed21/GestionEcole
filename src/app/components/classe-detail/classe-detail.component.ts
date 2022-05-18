import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
    classe:Classe;
    newClasse:Classe;
    submitted: boolean;
    eleveDialog: boolean;
    selectedEleves: any;
  constructor(private route: ActivatedRoute, private eleveService: EleveService, private classeService: ClasseService,
              private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.classeId = id;
      this.getElevesByClasse(id);
      this.getClasseById(id);
  }
    public getElevesByClasse(classeId){
        return this.eleveService.getElevesByClasse(classeId).subscribe((data) =>
        {
            this.eleves = data;
            console.log(this.eleves);
        })
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
        console.log(this.eleve.id);
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

    hideDialog() {
        this.eleveDialog = false;
        this.submitted = false;
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

    deleteSelectedEleves() {
        console.log("sdfgh");
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eleves = this.eleves.filter(val => !this.selectedEleves.includes(val));
                console.log(this.selectedEleves);
                this.eleveService.deleteAllEleves(this.selectedEleves).subscribe();
                this.selectedEleves = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            }
        });
    }


}
