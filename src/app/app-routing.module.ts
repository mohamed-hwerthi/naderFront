import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MontantTotalComponent } from './admin/montant-total/montant-total.component';
import { NbreClientComponent } from './admin/nbre-client/nbre-client.component';
import { NbreContratComponent } from './admin/nbre-contrat/nbre-contrat.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { AjouterContratComponent } from './ajouter-contrat/ajouter-contrat.component';
import { ClientComponent } from './client/client.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FactureComponent } from './facture/facture.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ModifierClientComponent } from './modifier-client/modifier-client.component';
import { PromotionsComponent } from './promotions/promotions.component';
import {ListeContratComponent } from './liste-contrat/liste-contrat.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'dashboard', component: DashbordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'client', component: ClientComponent },
  { path: 'client/Ajout', component: AjoutClientComponent },
  { path: 'client/Modifier', component: ModifierClientComponent },
  { path: 'facture', component: FactureComponent },
  { path: 'promotions/:code_contrat', component: PromotionsComponent },
  { path: 'modifier-client/:id', component: ModifierClientComponent },
  { path: 'contrat/Ajout', component: AjouterContratComponent },
  { path: 'contrat/Liste', component:  ListeContratComponent},
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      { path: 'nbreClient', component: NbreClientComponent },
      { path: 'nbreContrat', component: NbreContratComponent },
      { path: 'montant', component: MontantTotalComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
