import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router, // 131 added this arg so that we can use it in method onLoadServers()
    private authService: AuthService // 149 injected AuthService
  ) { }

  ngOnInit() {
  }

  // 131 added router.navigate()
  onLoadServers(){
    // important business logic goes here
    this.router.navigate(['/servers']); 
  }

  // 137, home.component.ts, added method onLoadServer
  onLoadServer(id: number){
    // navigate() function call...
    this.router.navigate(
      // passing in the id...
      ['/servers',id,'edit'],
      // passing in query param 'allowEdit' with a value of '1'...
      {queryParams: {allowEdit: '1'}, 
      // passing in the fragment '#loading'...
      fragment: 'loading'}
    ); 
  }

    // 149 added
    onLogin(){
        console.log('home.component onLogin');
        this.authService.login();
    }
    onLogout(){
        console.log('home.component onLogout');
        this.authService.logout();
    }

}
