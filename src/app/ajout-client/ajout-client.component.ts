import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap'; // Assurez-vous que Bootstrap est importé

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.scss']
})
export class AjoutClientComponent implements OnInit {
  clientForm: FormGroup;
  private apiUrl = 'http://localhost:8092/api/clients';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      numTel: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialisation du formulaire déjà effectuée dans le constructeur
  }

  createClient(): void {
    if (this.clientForm.valid) {
      this.http.post<any>(`${this.apiUrl}/create`, this.clientForm.value).subscribe(
        response => {
          console.log('Client created successfully!', response);
          // Afficher la modal de succès
          this.showSuccessModal();
        },
        error => {
          console.error('Error creating client:', error);
        }
      );
    }
  }

  showSuccessModal(): void {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const successModal = new bootstrap.Modal(modalElement);
      successModal.show();
    } else {
      console.error('Modal element not found!');
    }
  }

  redirectToClientList(): void {
    this.router.navigate(['/clients']); // Remplacez par la route réelle de la liste des clients
  }
}
