import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modifier-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.scss']
})
export class ModifierClientComponent implements OnInit {
  clientForm: FormGroup;
  private apiUrl = 'http://localhost:8092/api/clients';
  clientId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
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
    this.clientId = this.route.snapshot.paramMap.get('id');
    if (this.clientId) {
      this.http.get<any>(`${this.apiUrl}/recherche/${this.clientId}`).subscribe(
        client => {
          this.clientForm.patchValue(client);
        },
        error => {
          console.error('Error fetching client details:', error);
        }
      );
    } else {
      console.error('Client ID is null');
    }
  }

  updateClient(): void {
    if (this.clientForm.valid && this.clientId) {
      this.http.patch<any>(`${this.apiUrl}/update/${this.clientId}`, this.clientForm.value)
        .subscribe(
          response => {
            console.log('Client updated successfully!', response);
            const modalElement = document.getElementById('successModal');
            if (modalElement) {
              const successModal = new Modal(modalElement);
              successModal.show();
            }
          },
          error => {
            console.error('Error updating client:', error);
          }
        );
    }
  }

  redirectToClientDetails(): void {
    if (this.clientId) {
      this.router.navigate([`/client/${this.clientId}`]); // Modifiez cette route en fonction de votre application
    }
  }
}
