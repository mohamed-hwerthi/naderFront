import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClientComponent } from './client/client.component';
import { FactureComponent } from './facture/facture.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModifierClientComponent } from './modifier-client/modifier-client.component';
import * as $ from 'jquery';
import { ToastrModule } from 'ngx-toastr';
import { AjouterContratComponent } from './ajouter-contrat/ajouter-contrat.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NbreClientComponent } from './admin/nbre-client/nbre-client.component';
import { NbreContratComponent } from './admin/nbre-contrat/nbre-contrat.component';
import { MontantTotalComponent } from './admin/montant-total/montant-total.component';
import { SideAdminComponent } from './admin/side-admin/side-admin.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { ChartComponent } from './admin/chart/chart.component';
import { ListeContratComponent } from './liste-contrat/liste-contrat.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TokenInterceptor } from './Interceptors/token.interceptor';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'dashboard', component: DashbordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'client', component: ClientComponent },
  { path: 'facture', component: FactureComponent },
];

@NgModule({
  declarations: [
    AppComponent,

    LoginFormComponent,
    NavbarComponent,
    HomePageComponent,
    DashbordComponent,
    HeaderComponent,
    SidebarComponent,
    ClientComponent,
    FactureComponent,
    PromotionsComponent,
    AjoutClientComponent,
    ModifierClientComponent,
    AjouterContratComponent,
    DashboardComponent,
    NbreClientComponent,
    NbreContratComponent,
    MontantTotalComponent,
    SideAdminComponent,
    HeaderAdminComponent,
    ChartComponent,
    ListeContratComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,
    ButtonModule,
    TableModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // Position des notifications
      timeOut: 3000, // Durée d'affichage des notifications
      closeButton: true, // Affiche un bouton pour fermer la notification
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
