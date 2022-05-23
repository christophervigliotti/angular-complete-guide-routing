import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from '@angular/router';
@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        /* 151, we could grab the error message like this...
        this.errorMessage = this.route.snapshot.data['message'];
        ...but if this could possibly change while you are on the page we should subscribe... */
        this.route.data.subscribe(
            (data: Data) => {
                this.errorMessage = data['message'];
                console.log('error-page > ngOnInit data...');
                console.log(data);
            }
        );
    }

}
