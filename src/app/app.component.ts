import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    usersData : any;
    userAlbum : any;
    userPhotos : any;

    constructor(private dataService: DataService) {
        this.dataService.getData().then(res => {
            this.usersData = res;
            console.log('this.usersData', this.usersData)
        })
    }

    showAlbum(id) {
        this.dataService.getAlbumByUserId(id).then(res => {
            this.userAlbum = res;
            console.log('this.userAlbum', this.userAlbum)
        })
    }

    async showPhotos(id) {
        const data = await this.dataService.getPhotosByUserId(id)
        
        this.userPhotos = data;
        console.log('this.userPhotos ', this.userPhotos )
    }

}
