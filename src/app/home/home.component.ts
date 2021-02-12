import { Component, NgModule, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  users: User[] = [];
  names: string[];

  constructor(private modalService: NgbModal, private usersService: UsersService) { 
    this.user = new User(0, '', ' ', '', '', Date.now(), '')
  }

  id:any;
  searchterm: string = '';

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      (u) => this.users = u
    )
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  addUser(user: User) {
    this.user = user;
    this.usersService.addUser(this.user);
    this.modalService.dismissAll();
  }

  search() {
    this.names = [];
    if(this.searchterm != '') {
      this.users.forEach((user) => {
        if (user.name.toLowerCase().search(this.searchterm.toLowerCase()) != -1) {
          this.names.push(user.name)
        }
      })
    }
  }

}
