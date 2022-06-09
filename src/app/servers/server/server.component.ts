import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
    server: {id: number, name: string, status: string};

    constructor(
        private serversService: ServersService,
        private route: ActivatedRoute, // 139, server.component.ts, injected ActivatedRoute via the constructor
        private router: Router // 141, injected Router
    ){ 
    }

    ngOnInit() {
        /* 152, commented out...
        const id = +this.route.snapshot.params['id']; 
        console.log('server > ngOnInit() > id ' + id);
        this.server = this.serversService.getServer(1);
        this.route.params.subscribe(
            (params: Params) => {
                this.server = this.serversService.getServer(+params['id']);
            }
        );
        ...and replaced it with...
        */
       this.route.data.subscribe( // 'subscribe' is 'listen for changes'
            (data: Data) => 
            {
                this.server = data['server'];
            }
       );
    }

    // 141, added method onEdit that navigates to a relative path 'edit'
    /* 
    142, server.component.ts, added a third element to the 
    second argument in navigate() called "queryParamsHandling" 
    that...lets us handle query params (naturally lol).  In this 
    example we are preserving or maintaining our query params 
    when navigating to 'edit'.  Makes sense!
    */ 
    onEdit(){
        this.router.navigate(
            ['edit'],
            {
                relativeTo: this.route, 
                queryParamsHandling: 'preserve'
            }
        ); 
    }
}
