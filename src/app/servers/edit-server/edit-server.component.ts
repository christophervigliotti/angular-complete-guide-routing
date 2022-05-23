import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent 
    implements 
        OnInit,
        CanComponentDeactivate // 150 added it
    {

    // properties
    server: {id: number, name: string, status: string};
    serverName = '';
    serverStatus = '';
    allowEdit = false; // 141 new property
    changesSaved = false; // 150

    constructor(
        // properties, injected
        private serversService: ServersService,
        private route: ActivatedRoute,
        private router: Router // 150 new
    ) { }

  ngOnInit() {
    // 138 
    // console.log('edit-server ngOnInit');
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);

    this.route.params.subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
          this.serverName = this.server.name;
          this.serverStatus = this.server.status;
          console.log('edit-server > ngOnInit params.subscribe id ' + params['id']);
        }
    )

    // 141 setting property this.allowEdit based on the value of the query param allowEdit
    this.route.queryParams.subscribe(
        (queryParams: Params) => {
            this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
            console.log('edit-server > ngOnInit queryParams.subscribe this.allowEdit ' + this.allowEdit);
        }
    );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id']; // 150 added
    this.server = this.serversService.getServer(id);
    // EXERCISE: subscribe route params to update the id if params change
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

    onUpdateServer() {
        this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
        // 150 update changesSaved then navigate to parent
        this.changesSaved = true;
        this.router.navigate(['../'],{relativeTo: this.route});
    }

    // 150 implemented...
    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        if(!this.allowEdit){
            return true;
        }
        if(
            (this.serverName !== this.server.name || this.serverStatus !== this.server.status) 
            && !this.changesSaved
        ){
            return confirm('Do you want to discard the changes?');
        }else{
            return true;
        }
    }
}