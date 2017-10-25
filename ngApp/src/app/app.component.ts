import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
		private flashMessagesService: FlashMessagesService,
		private authService: AuthService,
		private router: Router
	) { }

  onLogOut(){
  	this.authService.logOut();
  	this.flashMessagesService.show('Has cerrado sesion',{cssClass: 'alert-success', timeout: 3000});
  	this.router.navigate(['/login']);
  	return false;
  }
}
