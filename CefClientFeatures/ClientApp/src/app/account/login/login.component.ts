import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errors = '';
  model = new Login();

  constructor(
    private readonly accountService: AccountService,
    private readonly router: Router) {
  }

  login(valid: boolean) {
    if (!valid) {
      return;
    }
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
        (error: string) => this.errors = error);
  }
}
