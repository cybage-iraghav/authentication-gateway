import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TimeoutService } from './timeout/timeout.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private authService: AuthService, private router: Router, private timeoutService: TimeoutService) {}

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
        if (authenticated) {
          this.timeoutService.addTimeout();
          return true;
        } else {
          this.router.navigate(['/login']);
          //window.location.href = 'http://localhost:8000/login';
          return false;
        }
      })
    );
  }



}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | boolean => {
  return inject(PermissionsService).canActivate(next, state);
}