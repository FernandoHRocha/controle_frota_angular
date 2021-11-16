import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarService } from '@shared/index';
import { CustomValidators } from '@shared/index';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from './login.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  navigateTo: string;
  
  private customValidators: CustomValidators;
  loginForm: FormGroup;
  passHide: boolean = true;

  ngOnInit(): void {
    this.createForm()
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/listar')
  }

  createForm(){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  login(){
    this.loginService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
      ).subscribe(
        user => {
          this.snackbarService.popupBottom('Bem vindo '+user.name)
        },
        response => {
          this.ngOnInit()
          this.snackbarService.popupBottom(response.error.message)
        },
        () => {
          this.router.navigate([atob(this.navigateTo)])
        }
      )
  }

}
