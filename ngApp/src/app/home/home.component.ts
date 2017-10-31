import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
		private flashMessagesService: FlashMessagesService,
		private authService: AuthService,
		private router: Router
  	) { }

  ngOnInit() {
  }

}
