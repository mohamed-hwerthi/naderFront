import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Facture } from '../models/facture.model';
import { FacturesService } from '../services/factures.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paiement } from '../models/Paiement.model';
import { PaiementService } from '../services/paiement.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
})
export class FactureComponent implements OnInit {
  searchQuery: string = '';
  factures: any;
  selectedFacture: any;
  paymentType: string = '';
  paymentStatus: { [factureId: number]: string } = {};
  paymentDetails: any;

   private baseUrl = 'http://localhost:8092/api/factures'

  constructor(
    private http: HttpClient,
    private factureService: FacturesService,
    private modalService: NgbModal,
    private paiementService: PaiementService
  ) {}

  ngOnInit(): void {}


  searchFactures() {
    const clientId = Number(this.searchQuery);
    if (!isNaN(clientId)) {
      this.factureService.getByIdFacture(clientId).subscribe(
        (data) => {
          console.log(data);
          for (const facture of data) {
            console.log('hawka l id', facture.status);
            if (facture.status === 'PAID') {
              this.paymentStatus[facture.id] = 'paid';
            }
          }
          this.factures = data;
        },
        (error) => {
          console.log('errrorrrr');
        }
      );
    }
  }

  openPaymentPanel(factureId: number, content: any) {
    this.selectedFacture = this.factures.find((facture: { id: number; }) => facture.id === factureId);
    this.modalService.open(content, { centered: true });
  }


  processPayment() {
    const paiement: Paiement = {
      factureId: this.selectedFacture.id,
      token: 'someToken',
      status: 'pending',
      amount: this.selectedFacture.montant,
      paymentType: this.paymentType
    };

    this.paiementService.postPaiement(paiement).subscribe(
      (response) => {
        console.log('Payment successful', response);
        this.paymentStatus[this.selectedFacture.id] = 'paid';
        this.modalService.dismissAll();
      },
      (error) => {
        console.error('Error processing payment', error);
        console.log('errrorrrrrr');
      }
    );
  }

  showPaymentDetails(factureId: number, content: any) {
    this.factureService.getByIdFacture(factureId).subscribe(
      (details) => {
        for(const data of details){
          this.paymentDetails = data;
          this.modalService.open(content, { centered: true });
        }
      },
      (error) => {
        console.error('Error fetching payment details', error);
      }
    );
  }


  downloadInvoice() {
    if (this.paymentDetails) {
      const doc = new jsPDF();
      doc.setFontSize(12);
      doc.text(`Entreprise: ${this.paymentDetails.entreprise}`, 10, 10);
      doc.text(`Montant: ${this.paymentDetails.montant}`, 10, 20);
      doc.text(`Type de paiement: ${this.paymentDetails.paymentType}`, 10, 30);
      doc.text(`Date: ${this.paymentDetails.dateFacture}`, 10, 40);
      

      doc.save('facture-details.pdf');
    } else {
      console.error('No payment details available');
    }
  }
}
