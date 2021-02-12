import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { User } from './user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: any;
  constructor(private firestore: AngularFirestore, private afStorage: AngularFireStorage ) { }
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  getUsers(): Observable<any> {
    return this.firestore.collection("users").valueChanges({ idField: 'id' });
  }

  addUser(user: User) {
    this.firestore.collection("users").add({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      crDate: user.crDate,
      image: user.image
    });
  }

  deleteUser(id: string, image: string) {
    this.ref = this.afStorage.refFromURL(image);
    this.firestore.collection("users").doc(id).delete();
    this.ref.delete();
  }

  updateUser(user: User, id: string) {
    this.firestore.collection("users").doc(id).update({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      image: user.image
    });
  }  

  uploadFileAndGetMetadata(event): FilesUploadMetadata {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref('/images/' + randomId);
    this.task = this.ref.put(event.target.files[0]);

    return {
      uploadProgress$: this.task.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(),
    };
  }

  private getDownloadUrl$(): Observable<string> {
    return from(this.task).pipe(
      switchMap((_) => this.ref.getDownloadURL()),
    );
  }

 
  search(userName) {
    return this.firestore.collection('users', ref => ref.where("name", "==", userName)).valueChanges();
  };
  
}
