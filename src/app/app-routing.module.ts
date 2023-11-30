import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import {ClasseComponent} from "./components/classe/classe.component";
import {EleveComponent} from "./components/eleve/eleve.component";
import {ClasseDetailComponent} from "./components/classe-detail/classe-detail.component";
import {NiveauComponent} from "./components/niveau/niveau.component";
import {MatiereComponent} from "./components/matiere/matiere.component";
import {NiveauEntreComponentComponent} from "./components/niveau-entre-component/niveau-entre-component.component";
import {NiveauQualificationCible} from "./modele/niveauQualificationCible";
import {
    NiveauQualificationCibleComponentComponent
} from "./components/./niveau-qualification-cible/niveau-qualification-cible.component";
import {CentreReferenceComponent} from "./components/centre-reference/centre-reference.component";
import {EntrepriseFormatriceComponent} from "./components/entreprise-formatrice/entreprise-formatrice.component";
import {SecteurComponent} from "./components/secteur/secteur.component";
import {BrancheComponent} from "./components/branche/branche.component";
import { FiliereComponent } from './components/filiere/filiere.component';
import {DepartementComponent} from "./components/departement/departement.component";
import {MetierComponent} from "./components/metier/metier.component";
import {ResponsableFormationComponent} from "./components/responsable-formation/responsable-formation.component";
// @ts-ignore
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent},
                    {path: 'uikit/formlayout', component: FormLayoutComponent},
                    {path: 'uikit/input', component: InputComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateComponent},
                    {path: 'uikit/table', component: TableComponent},
                    {path: 'uikit/list', component: ListComponent},
                    {path: 'uikit/tree', component: TreeComponent},
                    {path: 'uikit/panel', component: PanelsComponent},
                    {path: 'uikit/overlay', component: OverlaysComponent},
                    {path: 'uikit/media', component: MediaComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/message', component: MessagesComponent},
                    {path: 'uikit/misc', component: MiscComponent},
                    {path: 'uikit/charts', component: ChartsComponent},
                    {path: 'uikit/file', component: FileComponent},
                    {path: 'pages/crud', component: CrudComponent},
                    {path: 'pages/timeline', component: TimelineComponent},
                    {path: 'pages/empty', component: EmptyComponent},
                    {path: 'icons', component: IconsComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'uikit/classe', component: ClasseComponent},
                    {path: 'uikit/classe/:id', component: ClasseDetailComponent},
                    {path: 'uikit/eleve', component: EleveComponent},
                    {path: 'uikit/niveau', component: NiveauComponent},
                    {path: 'parametrage/niveauEntre', component: NiveauEntreComponentComponent},
                    {path: 'parametrage/niveauQualificationCible', component: NiveauQualificationCibleComponentComponent},
                    {path: 'parametrage/centreReference', component: CentreReferenceComponent},
                    {path: 'parametrage/entrepriseFormatrice', component: EntrepriseFormatriceComponent},
                    {path: 'parametrage/responsableFormation', component: ResponsableFormationComponent},
                    {path: 'parametrage/secteur', component: SecteurComponent},
                    {path: 'parametrage/branche', component: BrancheComponent},
                    {path: 'parametrage/filiere', component: FiliereComponent},
                    {path: 'parametrage/metier', component: MetierComponent},
                    {path: 'parametrage/departement', component: DepartementComponent},
                    {path: 'uikit/matiere', component: MatiereComponent}
                ],
            },
            {path:'pages/landing', component: LandingComponent},
            {path:'pages/login', component: LoginComponent},
            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path:'pages/access', component: AccessComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

