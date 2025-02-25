import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users-service/users.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  constructor(private usersService: UsersService, private storageService: StorageService) { }

  uploadProgress: number;
  url: any;
  userForm: any;
  @Input()
  user: User;
  myUser: User = new User(0, '', '', '', '', Date.now(), '');
  uploadProgress$: Observable<any>;
  subscription: Subscription;

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
    const { downloadUrl$, uploadProgress$ } = this.storageService.uploadImageAndGetMetadata(event.target.files[0]);
    this.uploadProgress$ = uploadProgress$;
    this.subscription = downloadUrl$.pipe().subscribe(
      (d) => {
        this.url = d;
        this.myUser.image = this.url;
      }
    )
  }

  addUserFlag():boolean {
    return !(this.user.image != '' || this.myUser.image != '');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
