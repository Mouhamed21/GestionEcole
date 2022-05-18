import { Component, OnInit } from '@angular/core';
import {EleveService} from "../../service/eleve.service";
import {ClasseService} from "../../service/classe.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss'],
  providers: [ClasseService,MessageService,ConfirmationService,EleveService]
})
export class EleveComponent implements OnInit {
    eleves: any;
    id:number;
  constructor(private classeService: ClasseService, private eleveService: EleveService, private router: Router,
              private messageService: MessageService, private confirmationService: ConfirmationService ) { }

  ngOnInit(): void {
      this.eleveService.getEleves().subscribe(data => this.eleves = data);

       this.eleveService.getElevesByClasse(this.id).subscribe((data) =>
      {
          //console.log(data);
          //this.eleveDialog=true;
          this.eleves = data;
          console.log(this.eleves);
          //this.router.navigate(['/uikit/eleve'], { queryParams: {id: 31 }});

          //this.elev = this.eleve;
      })
  }

}
