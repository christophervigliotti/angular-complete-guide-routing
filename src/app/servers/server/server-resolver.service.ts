// 152 added this file
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

// this interface is used by the resolve() method below
interface Server {
    id: number;
    name: string;
    status: string;
}

// when injecting a service into another service, add @Injectable()
// we are doing this in the constructor() method below
@Injectable()

export class ServerResolver 

    // this implements the Resolve interface provided by @angular/router
    // Resolve is a generic type, here it wraps the datatype that we get in the end
    implements Resolve<{

        // this is the type definition of the thing that the resolver will give us 
        id: number, 
        name: string, 
        status: string

    }> {

    // here we inject the ServersService (for use in method resolve() below)
    constructor(private serversService: ServersService) {}

    // the Resolve interface requires that we implement the resolve() method
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot

    // here we are returning either (a) an observable, (b) a promise 
    // or (c) the server (which we added as interface (above))
    ): Observable<Server> 
        | Promise<Server> 
        | Server 
    {

        // here we call serversService.getServer() which will return a server
        return this.serversService.getServer(
            +route.params['id']
        );
    }

}