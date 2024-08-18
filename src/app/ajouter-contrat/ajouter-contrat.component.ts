import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Importez HttpClient
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ajouter-contrat',
  templateUrl: './ajouter-contrat.component.html',
  styleUrls: ['./ajouter-contrat.component.scss']
})
export class AjouterContratComponent {
  contratForm!: FormGroup;

  private apiUrl = 'http://localhost:8092/api/contrats/create';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contratForm = this.fb.group({
      dateActivation: ['', Validators.required],
      statut: ['', Validators.required],
      numAppel: ['', Validators.required],
      clientId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contratForm.valid) {
      // Convertir le formulaire en un objet JSON compatible avec ContratDTO
      const contratData = {
        codeContrat: null,
        date_activation: this.contratForm.value.dateActivation,
        statut: this.contratForm.value.statut,
        numAppel: this.contratForm.value.numAppel,
        clientId: this.contratForm.value.clientId
      };

      this.http.post(this.apiUrl, contratData).subscribe(
        response => {
          console.log('Contrat créé avec succès:', response);
          // Afficher le modal de succès
          $('#successModal').modal('show');
        },
        error => {
          console.error('Erreur lors de la création du contrat:', error);
        }
      );
    }
  }
}
