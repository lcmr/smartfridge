import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Http, Headers} from '@angular/http';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

	name: String;
	address: String;
	telephone: String;
	user: String;

	result: Object;
 	constructor(
		private flashMessagesService: FlashMessagesService,
		private authService: AuthService,
		private router: Router,
		private http: Http
  	) { }

	ngOnInit() {
	}
		
	onRegisterSubmit(){

		this.authService.getProfile().subscribe(profile => {

			const store = {
				name: this.name,
				address: this.address,
				telephone: this.telephone,
				user: profile.user._id
			}
			let headers = new Headers();
		  	headers.append('Content-Type','application/json');
		  	this.http.post('/api/tienda',store,{headers: headers}).subscribe( res => 
			  	{
			  		const response = res.json();
			  		if(response.success){
						this.flashMessagesService.show('La tienda se ha registrado correctamente', { cssClass: 'alert-success', timeout: 3000});
						this.router.navigate(['/perfil']);
			  		}else{
						this.flashMessagesService.show('Ocurrio un problema', { cssClass: 'alert-danger', timeout: 3000});
						this.router.navigate(['/tienda']);
			  		}
			  	}
			  	,err => {
			  		console.log(err);
			  	}
		  	);

	  	},
	  	err => {
	  		console.log(err);
	  		return false;
	  	});

	}




}
