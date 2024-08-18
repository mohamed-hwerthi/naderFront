import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from 'src/app/clientModel';
import { ClientService } from 'src/app/services/client.service';
import { Contrat } from 'src/app/models/contrat.model';
import { ContratService } from 'src/app/services/contrat.service';
import { FacturesService } from 'src/app/services/factures.service';
@Component({
  selector: 'app-nbre-client',
  templateUrl: './nbre-client.component.html',
  styleUrls: ['./nbre-client.component.scss'],
})
export class NbreClientComponent implements OnInit {
  clientCount!: number;
  contratCount!: number;
  allContrats: Contrat[] = [];
  visible: boolean = false;
  allClients: ClientModel[] = [];
  visibleContrats: boolean = false;
  totalPaient: number = 0;

  showDialog() {
    this.visible = true;
  }
  showDialogContrats() {
    this.visibleContrats = true;
  }

  constructor(
    private http: HttpClient,
    private clientService: ClientService,
    private contratService: ContratService,
    private factureService: FacturesService
  ) {}

  ngOnInit(): void {
    this.getClientCount();
    this.getContratCount();
    this.getAllClients();
    this.getAllContrats();
    this.getTotalFacture();
  }

  getClientCount(): void {
    this.http.get<number>('http://localhost:8080/api/clients/count').subscribe(
      (count) => {
        this.clientCount = count;
      },
      (error) => {
        console.error('Error fetching client count:', error);
      }
    );
  }

  getContratCount(): void {
    this.http.get<number>('http://localhost:8080/api/contrats/count').subscribe(
      (count) => {
        this.contratCount = count;
      },
      (error) => {
        console.error('Error fetching contract count:', error);
      }
    );
  }

  getAllClients() {
    this.clientService.getAllClient().subscribe((res) => {
      this.allClients = res;
    });
  }

  getAllContrats() {
    this.contratService.getAllContrats().subscribe((res) => {
      this.allContrats = res;
    });
  }
  getTotalFacture() {
    this.factureService
      .getTotalFacture()
      .subscribe((res) => (this.totalPaient = res));
  }
}
