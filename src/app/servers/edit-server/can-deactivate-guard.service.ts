import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

// 150 new interface
export interface CanComponentDeactivate {
    canDeactivate: () => 
        // returns an Observable, a Promise or a boolean
        Observable<boolean> 
        | Promise<boolean> 
        | boolean;
} 

export 
    class CanDeactivateGuard 
    implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(
        component: CanComponentDeactivate, 
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot, 
        // returns an Observable, a Promise or a boolean
        nextState?: RouterStateSnapshot): 
            Observable<boolean> 
            | Promise<boolean> 
            | boolean
            {
                return component.canDeactivate();
            }
}