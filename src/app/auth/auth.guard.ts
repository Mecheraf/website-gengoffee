import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService } from '../services/auth-guard.service'; 
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){};
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ):Observable<boolean> | boolean {
      console.log('CanActivate called');
    return this.authService.isAuthorized().pipe(
      switchMap((res:any) => { //if there is a response 
        if(res?.message === "OK") { //OK means he is an admin, but we can return an ID in case of permissions 
          return of(true)
        } 
        return of(false) //in case of message different of what we expect
      }),
      catchError(e => { //otherwise we redirect to home 
        this.router.navigate(['']);
        return of(e)
      })
    );
  }
}
