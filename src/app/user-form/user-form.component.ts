import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { User } from '../user';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private afStorage: AngularFireStorage) { }

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;

  ngOnInit(): void {
    Object.assign(this.myUser, this.user);
  }

  @Input()
  user: User;
  myUser: User = new User(0, '', '', '', '', Date.now(), 'init');
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

  upload = (event) => {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref('/images/' + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);

    // AngularFireUploadTask provides observable
    // to get uploadProgress value
    // this.uploadProgress = this.task.snapshotChanges()
    // .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

    // observe upload progress
    this.uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(
          (d) => this.myUser.image = d
        )
      } )).subscribe(); 

  }



}
