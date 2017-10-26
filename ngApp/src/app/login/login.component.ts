import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	password: String;
	usuario: String;

  constructor(
  	private flashMessagesService: FlashMessagesService,
  	private authService: AuthService,
  	private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
  	const user = {
  		usuario: this.usuario,
  		password: this.password
  	}

  	this.authService.authenticateUser(user).subscribe(data => {
  		if(data.success){
  			this.authService.storeUserData(data.token, data.usuario);
  			this.flashMessagesService.show('Ahora estas logeado', { cssClass: 'alert-success', timeout: 3000});	
  			this.router.navigate(['dashboard']);
  		}else{
  			this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000});	
  			this.router.navigate(['login']);
  		}
  	});

  }

}
