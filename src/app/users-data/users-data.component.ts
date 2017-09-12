import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.css']
})
export class UsersDataComponent implements OnInit {

  	@Input() user: Object;
    userAlbum : any;
    albumPhotos : Array<Object> = new Array();
    showAlbums: boolean = false;
	showPhotos: Array<boolean> = new Array();	
	
	constructor(private dataService: DataService) { }

	ngOnInit() {
	}

	getAlbum(id) {
	  	if(this.userAlbum) { // if this album is already loaded
			  this.showAlbums = ! this.showAlbums;
		} else { // if not we use our service 'dataService' to get it 
			this.dataService.getAlbumByUserId(id).then(res => {
				this.userAlbum = res;
				this.showAlbums = ! this.showAlbums;
				// console.log('this.userAlbum', this.userAlbum)
        	})
		}
    }

    async getPhotos(albumId) {
		// if the photos are already loaded
		if(this.albumPhotos[albumId]){
			this.showPhotos[albumId] = ! this.showPhotos[albumId];
		} else { // if not we use our service 'dataService' to get them
			const data = await this.dataService.getPhotosByAlbumId(albumId)
            this.albumPhotos[albumId] = data;
            // we initialize the showPhtos array with false
			for(let i=0; i<this.albumPhotos.length; i++){ this.showPhotos[i] = false }
			this.showPhotos[albumId] = ! this.showPhotos[albumId];
			// console.log('this.albumPhotos ', this.albumPhotos )
		}
    }

}
