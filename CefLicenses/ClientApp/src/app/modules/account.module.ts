import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountService } from '../services/account.service';
import { LoginComponent } from '../components/account/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'Account/Login', component: LoginComponent }
    ]),
    FontAwesomeModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule {
}
