import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	private apiUrl = 'http://jsonplaceholder.typicode.com/';
	userPhotos : Array<Object> = new Array();

	constructor(private http: Http) { }
	
	
	getData() {	
		return new Promise((resolve, reject) => {
			this.http.get(this.apiUrl + 'users').map((res: Response) => res.json())
				.subscribe(data => {
					resolve(data);	
			},	err => {
					reject(err);
			});
		})
	}

	getAlbumByUserId(id) {
		return new Promise((resolve, reject) => {
			this.http.get(this.apiUrl + 'albums?userId='+ id).map((res: Response) => res.json())
				.subscribe(data => {
					resolve(data);	
			},	err => {
					reject(err);
			});
		})
	}

	getPhotosByUserId(userid) {
		return new Promise((resolve, reject) => {
			this.getAlbumByUserId(userid).then(res => {
				// get the ids of the albums of a user
				let userAlbumIds = Object.keys(res).map( _ => {
					return res[_]['id'];
				})
				// get the photos of each album
				userAlbumIds.forEach( id => {
					this.http.get(this.apiUrl + 'photos?albumId='+ id).map((res: Response) => res.json())
						.subscribe(data => {
							this.userPhotos.push(data);
						},err => {
							console.log('err', err);
						});
				})
				// console.log('this.userPhotos data service', this.userPhotos)
				resolve(this.userPhotos)
			})
		})
	}


}
