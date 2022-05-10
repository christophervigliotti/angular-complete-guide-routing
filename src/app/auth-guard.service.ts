import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()

// 148 added CanActivateChild (more notes below)
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router){}

    canActivate
    (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):  
    Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated()
        .then(
            (authenticated: boolean) => {
                if(authenticated){
                    return true;
                }else{
                    this.router.navigate(['/']);
                }
            }
        );
    }
    
    /*
    148 added method canActivateChild()

        canActivateChild
            (
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot
            ):
            Observable<boolean> | Promise<boolean> | boolean {
                return this.canActivate(route, state);
            }

        this method fires for all routes that are children of the specified route(s) 
            (specified in this case in app-routing-module.ts)

    modified the 'servers' route in app-routing-module.ts...

        ...
        {
            path:'servers', 
            //  we no longer need this canActivate:[AuthGuard], 
            canActivateChild:[AuthGuard], // this was added
            component: ServersComponent, 
            children: 
                [
                    {path: ':id',component: ServerComponent},
                    {path: ':id/edit',component: EditServerComponent} 
                ]
        },
        ...             

    */
    canActivateChild
    (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
    Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}