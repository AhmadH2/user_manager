import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
  userForm: any;
  @Input()
  user: User;
  myUser: User = new User(0, '', '', '', '', Date.now(), '');
  uploadProgress$: Observable<any>;

  @Output() emitter = new EventEmitter<User>();

  ngOnInit(): void {
    Object.assign(this.myUser, this.user);
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9_]*")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role : new FormControl('', [Validators.required]),
      status: new FormControl('', Validators.required),
      image: new FormControl('' )
    })
  }
  get name() { return this.userForm.get("name"); }
  get email() { return this.userForm.get("email"); }
  get role() { return this.userForm.get("role"); }
  get status() { return this.userForm.get("status"); }
  get image() { return this.userForm.get("image"); }

  save() {
    this.emitter.emit(this.myUser);
  }

  uploadImage(event) {
    const { downloadUrl$, uploadProgress$ } = this.usersService.uploadFileAndGetMetadata(event);
    this.uploadProgress$ = uploadProgress$;
    downloadUrl$.pipe().subscribe(
      (d) => {
        this.url = d;
        console.log(this.url);
        this.myUser.image = this.url;
      }
    )
  }

  addUserFlag():boolean {
    return !(this.user.image != '' || this.myUser.image != '');
  }

  

}
