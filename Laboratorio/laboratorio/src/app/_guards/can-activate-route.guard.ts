import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot, 
         Router} from '@angular/router';
import { UserService } from '../_shared/services/user.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private userSvc: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.userSvc.getLoginStatus()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
}