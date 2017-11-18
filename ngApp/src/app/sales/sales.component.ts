import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Http, Headers} from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
	store: Object;
	total: Object;
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
     		this.authService.getTotal(params['id']).subscribe(profile => {
      			this.store = profile.ventas;
      			this.total = profile.total;
	  		},
		  	err => {
		  		console.log(err);
		  		return false;
		  	});
	    });

	}

	parseDate(date){
		var fecha = new Date(date);

		return fecha.toLocaleString('en-US');
	}

}
