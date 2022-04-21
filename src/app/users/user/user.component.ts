import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  // 134 user.component.ts, injected the activated route here in order to access path data (specifically in this case the user id)
  constructor(
    private route: ActivatedRoute 
  ) { }

  // 134 user.component.ts, using route to get the param value for ID
  ngOnInit() {
    console.log('user.component ngOnInit > "id" is "' + this.route.snapshot.params['id'] + '"');
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    // 135, user.component.ts, added the params 'observable' 
    // an observable is a feature added by a 3rd party package that allow you to work with async tasks
    this.route.params.subscribe(
      // the subscribe method here takes three args...
      // arg.1. - a function that will be fired when new data is sent through the observable
      (params: Params) => {
        // this will update the user property when the params change
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
      // arg.2. - tbd
      // arg.3. - tbd
      );
  }
}
