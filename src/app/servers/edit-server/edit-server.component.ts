import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false; // 141 new property

  changesSaved = false; // 150

    constructor(
        private serversService: ServersService,
        // 138 injecting the ActivatedRoute 
        private route: ActivatedRoute,
        private router: Router // 150 new
    ) { }

  ngOnInit() {
    // 138 
    // console.log('edit-server ngOnInit');
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);

    // 141 setting property this.allowEdit based on the value of the query param allowEdit
    this.route.queryParams.subscribe(
        (queryParams: Params) => {
            this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
            console.log('edit-server ngOnInit queryParams.subscribe');
            console.log('queryParams["allowEdit"] = ' + queryParams['allowEdit']);
        }
    );
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});

    // 150 update changesSaved then navigate to parent
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo: this.route});

}

}
