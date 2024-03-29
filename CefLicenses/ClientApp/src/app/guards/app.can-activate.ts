import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable()
export class AppCanActivate implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly accountService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.accountService.hasToken()) {
      return true;
    } else {
      this.router.navigate(['Account/Login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
