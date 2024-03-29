import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
<!--                <a href="https://www.primefaces.org/primeblocks-ng/#/">
                    <img src="assets/layout/images/{{appMain.config.dark ? 'banner-primeblocks-dark' : 'banner-primeblocks'}}.png" alt="Prime Blocks" class="w-full mt-3"/>
                </a>-->
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items:[
                    {label: 'Accueil',icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            {
                label: 'Apprenant',
                items:[
                    {label: 'Observations',icon: 'pi pi-fw pi-chart-bar', routerLink: ['/apprenant/observation']}
                ]
            },
            {
                label: 'formation',
                items: [
                    {label: "Formations", icon: 'pi pi-fw pi-circle', routerLink: ['/formation/formation']},
                    {label: "Entreprise Formatrices", icon: 'pi pi-fw pi-circle', routerLink: ['/formation/entrepriseFormatrice']},
                    {label: "Responsables Formation", icon: 'pi pi-fw pi-circle', routerLink: ['/formation/responsableFormation']},

                ]
            },
            {
                label: 'Lieux',
                items: [
                    {label: "Regions", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/lieux/region']},
                    {label: "Departements", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/lieux/departement']},
                    {label: "Inspections d'Academie", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/lieux/inspection']},
                    {label: "Centres de Reference", icon: 'pi pi-fw pi-eye', routerLink: ['/lieux/centreReference']},
                ]
            },
            {
                label: 'qualifications',
                items: [
                    {label: "Secteurs", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/qualifications/secteur']},
                    {label: "Branches", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/qualifications/branche']},
                    {label: "Filieres", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/qualifications/filiere']},
                    {label: "Metiers", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/qualifications/metier']},
                ]
            },
            {
                label: 'Niveau',
                items: [
                    {label: "D'Entrees", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/niveau/niveauEntre']},
                    {label: "De Qualification Ciblé", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/niveau/niveauQualificationCible']},
                    //{label: "eleve", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/eleve']},
                ]
            },
         /*   {
                label:'Prime Blocks',
                items:[
                    {label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW'},
                    {label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank'},
                ]
            },
            {label:'Utilities',
                items:[
                    {label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/icons']},
                    {label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank'},
                ]
            },
            {
                label: 'Pages',
                items: [
                    {label: 'Crud', icon: 'pi pi-fw pi-user-edit', routerLink: ['/pages/crud']},
                    {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
                    {label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: ['pages/landing']},
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['pages/login']},
                    {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['pages/error']},
                    {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['pages/notfound']},
                    {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['pages/access']},
                    {label: 'Empty', icon: 'pi pi-fw pi-circle', routerLink: ['/pages/empty']}
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label:'Get Started',
                items:[
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }*/
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
