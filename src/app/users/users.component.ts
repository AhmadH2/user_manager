import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private usersService: UsersService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
  }

  print(u) {
    return JSON.stringify(u);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  editUser(user: User, index: number) {
    Object.assign(this.usersService.getUsers()[index], user);
    this.modalService.dismissAll();
  }

  deleteUser(index:number) {
    this.usersService.getUsers().splice(index, 1);
  }

}
