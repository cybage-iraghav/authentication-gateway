import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private authService: AuthService, private router: Router) {}

  /*canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.checkAuthentication()) {
      console.log('whats wrong');
      return true; // User is authenticated
    } else {
      // User is not authenticated, redirect to Laravel authentication page
      window.location.href = 'http://localhost:8000/login';
      return false;
    }
  }*/

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.checkAuthentication().pipe(
      map((authenticated: boolean) => {
        if (!authenticated) {
          return true;
        } else {
          this.router.navigate(['/home']);
          //window.location.href = 'http://localhost:8000/login';
          return false;
        }
      })
    );
  }



}

export const AuthLoginGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | boolean => {
  return inject(PermissionsService).canActivate(next, state);
}