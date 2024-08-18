import { Component, OnInit } from '@angular/core';
import { ContratService } from '../services/contrat.service';
import { Contrat } from '../models/contrat.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Assurez-vous d'avoir installé ngx-toastr

@Component({
  selector: 'app-liste-contrat',
  templateUrl: './liste-contrat.component.html',
  styleUrls: ['./liste-contrat.component.scss']
})
export class ListeContratComponent implements OnInit {
  contrats: Contrat[] = [];
  selectedStatus: string = '';
  selectedContrat: Contrat | null = null;
  private editModalRef: NgbModalRef | null = null;
  private deleteModalRef: NgbModalRef | null = null;
  private archiveModalRef: NgbModalRef | null = null;
  editContractForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private contratService: ContratService,
    private toastr: ToastrService // Injection du service Toastr
  ) {}

  ngOnInit(): void {
    this.editContractForm = this.fb.group({
      dateActivation: ['', Validators.required],
      statut: ['', Validators.required],
      numAppel: ['', Validators.required]
    });

    this.loadAllContrats();  // Charger les contrats au démarrage
  }

  // Charger tous les contrats
  loadAllContrats() {
    this.contratService.getAllContrats().subscribe(
      (data: Contrat[]) => {
        this.contrats = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des contrats', error);
      }
    );
  }

  // Filtrer les contrats par statut
  filterContrats(): void {
    if (this.selectedStatus) {
      this.getContratsByStatus(this.selectedStatus);
    } else {
      this.loadAllContrats();
    }
  }

  private getContratsByStatus(status: string): void {
    this.contratService.getContratsByStatus(status).subscribe(
      (data: Contrat[]) => {
        this.contrats = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des contrats', error);
      }
    );
  }

  openDeleteModal(contrat: Contrat, content: any) {
    this.selectedContrat = contrat;
    this.deleteModalRef = this.modalService.open(content, { centered: true });
  }

  openArchiveModal(contrat: Contrat, content: any) {
    this.selectedContrat = contrat;
    this.archiveModalRef = this.modalService.open(content, { centered: true });
  }

  updateContract(modal: any): void {
    if (this.editContractForm.invalid) {
      return;
    }

    const updatedContrat: Contrat = {
      ...this.selectedContrat!,
      ...this.editContractForm.value,
    };

    this.contratService.updateContrat(updatedContrat).subscribe({
      next: (response) => {
        console.log('Contrat modifié avec succès', response);
        this.loadAllContrats(); // Recharger les contrats après modification
        modal.close();
        this.toastr.success('Contrat modifié avec succès', 'Succès'); // Afficher un message de succès
      },
      error: (error) => {
        console.error('Erreur lors de la modification du contrat', error);
        this.toastr.error('Erreur lors de la modification du contrat', 'Erreur'); // Afficher un message d’erreur
      }
    });
  }

  openEditModal(contrat: Contrat, content: any): void {
    this.selectedContrat = contrat;

    // Pré-remplir le formulaire avec les données existantes du contrat
    this.editContractForm.patchValue({
      dateActivation: contrat.dateActivation,
      statut: contrat.statut,
      numAppel: contrat.numAppel
    });

    this.editModalRef = this.modalService.open(content, { centered: true });
  }


  // Méthode pour supprimer le contrat
  deleteContrat(): void {
    if (this.selectedContrat) {
      this.contratService.deleteContrat(this.selectedContrat.codeContrat).subscribe({
        next: () => {
          // Supprimer le contrat de la liste affichée
          this.contrats = this.contrats.filter(c => c.codeContrat !== this.selectedContrat?.codeContrat);
          this.toastr.success('Contrat supprimé avec succès', 'Succès');
          this.deleteModalRef?.close();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du contrat', error);
          this.toastr.error('Erreur lors de la suppression du contrat', 'Erreur');
        }
      });
    }
  }
}
