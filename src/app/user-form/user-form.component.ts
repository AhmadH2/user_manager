import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  uploadProgress: number;
  url: any;

  ngOnInit(): void {
    Object.assign(this.myUser, this.user);

  }

  @Input()
  user: User;
  myUser: User = new User(0, '', '', '', '', Date.now(), 'init');

  @Output() emitter = new EventEmitter<User>();

  save() {
    this.emitter.emit(this.myUser);
  }

  async uploadImage(event) {
    var obj = await this.usersService.uploadImage(event);
    this.url = obj["url"];
    this.uploadProgress = obj["progress"]
    this.myUser.image = this.url;
  }

}
