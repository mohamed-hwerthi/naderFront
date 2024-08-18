import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Login() {
    if (this.loginForm.valid) {
      const bodyData = this.loginForm.value;
      console.log('----------->', this.loginForm.value);
      this.http
        .post<{ message: string; username?: string }>(
          'http://localhost:8080/api/auth',
          bodyData,
          { observe: 'response' } // To get full response including status
        )
        .subscribe({
          next: (res: HttpResponse<any>) => {
            if (res.body.statusCode === 'UNAUTHORIZED') {
              alert(res.body.message);
            } else if (res.body.statusCode === 'NOT_FOUND') {
              alert(res.body.message);
            } else {
              alert('Login successfully established');
              this.router.navigateByUrl('/dashboard');
              //setting role and token in localstorage  :
              localStorage.setItem('token', res.body.token);
              localStorage.setItem('role', res.body.role);
              if (res.body.role === 'CLIENT') {
                this.router.navigateByUrl('/dashboard');
              } else {
                this.router.navigateByUrl('admin');
              }
            }
          },
        });
    } else {
      alert('Please fill in both fields.');
    }
  }
}
