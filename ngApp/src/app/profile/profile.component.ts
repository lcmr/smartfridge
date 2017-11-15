import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Http, Headers} from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: Object;
  stores: Object;
  constructor(
    private flashMessagesService: FlashMessagesService,
  	private authService: AuthService,
  	private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
  	this.authService.getProfile().subscribe(profile => {
  		this.user = profile.user;
      this.stores = profile.stores;
      console.log(profile);
  	},
  	err => {
  		console.log(err);
  		return false;
  	});
  }


  deleteStore(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.http.delete('/api/tienda/'+id,{headers: headers}).subscribe( res => 
      {
        const response = res.json();
        if(response.success){
          this.flashMessagesService.show('La tienda se ha eliminado correctamente', { cssClass: 'alert-success', timeout: 3000});
        }else{
          this.flashMessagesService.show('Ocurrio un problema', { cssClass: 'alert-danger', timeout: 3000});
        }
      }
      ,err => {
        console.log(err);
      }
    );
    this.loadProfile();
    this.router.navigate(['/perfil']); 
  }

  private loadProfile(){
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.stores = profile.stores;
    },
    err => {
      console.log(err);
      return false;
    });
  }
}
