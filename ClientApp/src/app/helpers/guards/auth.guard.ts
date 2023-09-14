import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router,} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isTokenExpired()) {
      let roles = next.data['permittedRoles'] as Array<string>;
      if (!roles) return true;
      if (this.authService.roleMatch(roles)) return true;
      this.router.navigate(['/login']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   return true;
  // }
}
