import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Http, Headers} from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {
	fridge: Object;
	private sub: any;
	constructor(
		private flashMessagesService: FlashMessagesService,
		private authService: AuthService,
		private router: Router,
		private http: Http,
		private route: ActivatedRoute
    ) { }

	ngOnInit() {
	    this.sub = this.route.params.subscribe(params => {
     	  	//this.id = +params['id']; // (+) converts string 'id' to a number
     		this.authService.getFridge(params['id']).subscribe(profile => {
      			this.fridge = profile;
	  		},
		  	err => {
		  		console.log(err);
		  		return false;
		  	});
	    });

	}

}
