import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];


  constructor(private usersService: UsersService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      (u) => {
        u.docs.forEach(element => {
          this.users.push(element.data())
        });
      }
    )
  }
  print(u) {
    return JSON.stringify(u);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  editUser(user:User, userName: string) {
    this.usersService.update(user, userName);
    this.modalService.dismissAll();
  }

  deleteUser(name) {
    this.usersService.delete(name);
    console.log("clicked");
  }
  


}
