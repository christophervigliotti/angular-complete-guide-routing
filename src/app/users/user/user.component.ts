import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  }

}
