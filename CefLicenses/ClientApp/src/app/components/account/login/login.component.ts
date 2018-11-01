import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Login } from '../../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error: string;
  model: Login;

  constructor(
    private readonly accountService: AccountService,
    private readonly router: Router) {
    this.model = new Login();
  }

  login(form: NgForm): void {
    if (!form.valid) { return; }
    this.accountService
      .login(this.model)
      .subscribe(
        (res: boolean) => {
          if (res) {
            const returnUrl = this.accountService.getReturnUrl();
            if (typeof returnUrl === 'string' && returnUrl.length > 0) {
              this.accountService.setReturnUrl('');
              this.router.navigate([returnUrl]);
            } else {
              this.router.navigate(['/Home']);
            }
          }
        },
        (error: string) => this.error = error);
  }
}
