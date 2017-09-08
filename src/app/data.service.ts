import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	private apiUrl = 'http://jsonplaceholder.typicode.com/';

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

}
