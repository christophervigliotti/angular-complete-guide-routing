import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router// 131 added this arg so that we can use it in method onLoadServers()
  ) { }

  ngOnInit() {
  }

  // 131 added router.navigate()
  onLoadServers(){
    // important business logic goes here
    this.router.navigate(['/servers']); 
  }

}
