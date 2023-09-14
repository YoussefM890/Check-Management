import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Login} from "../models/interfaces/login";
import {AuthService} from "../helpers/services/auth.service";
import {IResponse} from "../../shared";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  form: Login;
  hide: boolean;

  @ViewChild('logForm') loginFormDirective;
  formErrors = {
    email: '',
    password: '',
  };
  validationMessages = {
    email: {
      required: 'mail est obligatoire',
      email: 'Format du mail invalide',
    },
    password: {
      required: 'Mot de passe obligatoire',
    },
  };

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              public toastr: ToastrService) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.touched && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  changePasswordVisibility() {
    this.hide = !this.hide;
  }

  login() {
    this.form = this.loginForm.value;
    this.authService.login(this.form).subscribe(
      (res: IResponse) => {
        if (res.success) {
          this.authService.setToken(res.data.token);
          this.router.navigate(['/home']);
        } else {
          this.toastr.error(res.message);
        }
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
