import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router// 131 added
  ) { }

  ngOnInit() {
  }

  // 131 added
  onLoadServers(){
    // important business logic goes here
    this.router.navigate(['servers']);
  }

}
