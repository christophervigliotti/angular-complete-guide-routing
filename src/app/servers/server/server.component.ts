import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
        const id = +this.route.snapshot.params['id']; // 139, added (the + converts the id to a number)
        console.log('server.component ngOnInit() > id ' + id);
        this.server = this.serversService.getServer(1);
        // 139 added this subscribe method...get a new server when the id changes
        this.route.params.subscribe(
            (params: Params) => {
                this.server = this.serversService.getServer(+params['id']);
            }
        );
    }

    // 141, added method onEdit that navigates to a relative path 'edit'
    onEdit(){
        this.router.navigate(['edit'],{relativeTo: this.route}); 
    }
}
