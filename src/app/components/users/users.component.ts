import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users-service/users.service';

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
      (d) => {
       this.users = d;
      }
    )
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  editUser(user:User, id: string) {
    this.usersService.updateUser(user, id);
    this.modalService.dismissAll();
  }

  deleteUser(id: string, image: string) {
    this.usersService.deleteUser(id, image);
    console.log("clicked");
    this.modalService.dismissAll();
  }

}
