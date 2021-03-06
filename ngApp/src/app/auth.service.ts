import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

	authToken:any;
	user:any;

  constructor(private http:Http) { }

  registerUser(user){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('/api/usuario',user,{headers: headers})
  		.map(res => res.json());
  }

  authenticateUser(user){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('/api/autenticar',user,{headers: headers})
  		.map(res => res.json());	
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('/api/perfil',{headers: headers})
      .map(res => res.json());  
  }

  getFridge(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    return this.http.get('/api/refri/'+id,{headers: headers})
      .map(res => res.json());  
  }



  getSales(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    return this.http.get('/api/ventas/'+id,{headers: headers})
      .map(res => res.json());  
  }

  getTotal(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    return this.http.get('/api/ventas/total/'+id,{headers: headers})
      .map(res => res.json());  
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user){
  	localStorage.setItem('id_token',token);
  	localStorage.setItem('usuario', JSON.stringify(user));
  	this.authToken = token;
  	this.user = user;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logOut(){
  	this.authToken = null;
  	this.user = null;
  	localStorage.clear();
  }
}
