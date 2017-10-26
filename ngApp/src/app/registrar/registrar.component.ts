import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
	usuario: String;
	password: String;
	email: String;
	nombre: String;

	constructor(
		private userService: UserService, 
		private flashMessagesService: FlashMessagesService,
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit() {
	}

	onRegisterSubmit(){
		const user = {
			usuario: this.usuario,
			password: this.password,
			email: this.email,
			nombre: this.nombre
		}

		//validar campos
		if(!this.userService.validateRegister(user)){
			this.flashMessagesService.show('Porfavor llenar todos los campos', { cssClass: 'alert-danger', timeout: 3000});
			return false;
		}

		//registrar
		this.authService.registerUser(user).subscribe(data => {
			if(data.success){
				this.flashMessagesService.show('Te has registrado correctamente', { cssClass: 'alert-success', timeout: 3000});
				this.router.navigate(['/login']);
			}else{
				this.flashMessagesService.show('Ocurrio un problema', { cssClass: 'alert-danger', timeout: 3000});
				this.router.navigate(['/registrar']);
			}
		});

	}


}