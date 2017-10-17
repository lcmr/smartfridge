import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
  inputs: ['user']
})
export class UserdetailComponent implements OnInit {

  private editUser: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.editUser = false;
  }

  onUserClick(){
    this.editUser = true;
  }

}
