import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    usersData : any;

    constructor(private dataService: DataService) {

        this.dataService.getData().then(res => {
            this.usersData = res;
            console.log('this.usersData', this.usersData)
        })

    }

    ngOnInit() {
    }

}
