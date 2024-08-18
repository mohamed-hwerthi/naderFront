import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Contrat } from '../models/contrat.model';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  contratDetails = {
    dateActivation: '',
    statut: '',
    numAppel: ''
  };
  codeContrat!: number;
  client!: any;
  searchQuery: string = '';
  editContractForm: FormGroup;
  contracts: any[] = [];
  apiUrl = 'http://localhost:8092/api';
  contrats: Contrat[] = [];
  selectedContrat: any = null;

  @ViewChild('editContractModal') editContractModal!: ElementRef;
 // @ViewChild('deleteModal') deleteModal!: ElementRef;
  @ViewChild('deleteModal', { static: false }) deleteModal: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editContractForm = this.fb.group({
      codeContrat: ['', Validators.required],
      dateActivation: ['', Validators.required],
      statut: ['', Validators.required],
      numAppel: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    // Récupérer le codeContrat depuis les paramètres de la route
    this.route.params.subscribe(params => {
      this.codeContrat = +params['codeContrat']; // Convertir en nombre
    });
  }

  searchClients() {
    const apiUrl = `${this.apiUrl}/clients/recherche/${this.searchQuery}`;
    this.http.get<any>(apiUrl).subscribe(
      data => {
        if (data) {
          this.client = data;
          console.log('Client trouvé :', this.client);
          this.getContracts(data.id);
        } else {
          this.client = null;
        }
      },
      error => {
        console.error('Erreur lors de la recherche du client', error);
        this.client = null;
      }
    );
  }

  getContracts(clientId: number) {
    const apiUrl = `${this.apiUrl}/clients/contrats/${clientId}`;
    this.http.get<Contrat[]>(apiUrl).subscribe(
      data => {
        this.client.contrats = data;
        console.log('Contrats récupérés:', this.client.contrats);
      },
      error => {
        console.error('Erreur lors de la récupération des contrats', error);
        this.client.contrats = [];
      }
    );
  }

  navigateToAjoutClient() {
    this.router.navigate(['/client/Ajout']);
  }

  navigateToModifClient(clientId: string): void {
    this.router.navigate(['/modifier-client', clientId]);
  }

  openEditModal(contrat: any): void {
    this.editContractForm.patchValue({
      codeContrat: contrat.code_contrat,
      dateActivation: contrat.date_activation,
      statut: contrat.statut,
      numAppel: contrat.num_appel
    });

    setTimeout(() => {
      if (this.editContractModal) {
        ($(this.editContractModal.nativeElement) as any).modal('show');
      } else {
        console.error('Modal element not found in the DOM');
      }
    }, 0);
  }

  onSubmit(): void {
    const updatedContract = this.editContractForm.value;
    // Convertir la date en type `Date`
    updatedContract.dateActivation = new Date(updatedContract.dateActivation).toISOString().split('T')[0];
    const apiUrl = `${this.apiUrl}/contrats/updateC/${updatedContract.codeContrat}`;

    this.http.put<any>(apiUrl, updatedContract).subscribe(
      response => {
        console.log('Contrat mis à jour avec succès:', response);
        this.getContracts(this.client.id);
        this.editContractForm.reset();
        if (this.editContractModal) {
          ($(this.editContractModal.nativeElement) as any).modal('hide');
        }
      },
      error => {
        console.error('Erreur lors de la mise à jour du contrat:', error);
      }
    );
  }

  openDeleteModal(contrat: any): void {
    this.selectedContrat = contrat;
    setTimeout(() => {
      if (this.deleteModal) {
        ($(this.deleteModal.nativeElement) as any).modal('show');
      } else {
        console.error('Modal element not found in the DOM');
      }
    }, 0);
  }

  deleteContract() {
    const codeContrat = this.selectedContrat?.codeContrat;
    if (codeContrat) {
      this.http.delete(`${this.apiUrl}/contrats/delete/${codeContrat}`).subscribe({
        next: (response: any) => {
          this.toastr.success('Le contrat a été supprimé avec succès!');
          if (this.deleteModal) {
            ($(this.deleteModal.nativeElement) as any).modal('hide');
          }
          this.removeFromTable(codeContrat);
        },
        error: error => {
          console.error('Error deleting contract:', error);
          this.toastr.error('Une erreur est survenue lors de la suppression.', 'Erreur');
        }
      });
    } else {
      this.toastr.error('Code contrat invalide.', 'Erreur');
    }
  }


  removeFromTable(codeContrat: number) {
    this.contrats = this.contrats.filter(contrat => contrat.codeContrat !== codeContrat);
  }

  updateContract() {
    if (isNaN(this.codeContrat)) {
      this.toastr.error('Code du contrat invalide');
      return;
    }

    const url = `http://localhost:8097/api/contrats/updateC/${this.codeContrat}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Convertir la date en type `Date`
    this.contratDetails.dateActivation = new Date(this.contratDetails.dateActivation).toISOString().split('T')[0];

    this.http.put(url, this.contratDetails, { headers }).subscribe(
      response => {
        console.log('Contrat mis à jour avec succès', response);
        this.toastr.success('Contrat mis à jour avec succès');
      },
      error => {
        console.error('Erreur lors de la mise à jour du contrat', error);
        this.toastr.error('Erreur lors de la mise à jour du contrat');
      }
    );
  }
}
