import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Object.assign(this.myUser, this.user);
  }

  @Input()
  user: User;
  myUser: User = new User(0, '', '', '', '', 4, '');
  imgURL: any;

  @Output() emitter = new EventEmitter<User>();

  
  save() {
    this.emitter.emit(this.myUser);
  }

  uploadImage(files: any) {
    if (files.length == 0)
      return;

    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (_event) => {
      this.imgURL = fileReader.result;
    }
    this.user.image = this.imgURL;
  }

}
