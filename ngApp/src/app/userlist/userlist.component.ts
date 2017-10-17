import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  inputs: ['users'],
  outputs: ['SelectUser']
})
export class UserlistComponent implements OnInit {

  public SelectUser = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onselect(user: User){
    this.SelectUser.emit(user);
  }

}
