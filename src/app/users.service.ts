import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: any;
  constructor(private firestore: AngularFirestore, private afStorage: AngularFireStorage ) { 
    // this.ref = this.afStorage.ref('/images/' + 0);
    // this.task = this.ref.put('');
  }
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<any>;
  url: string;

  getUsers(): any {
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

  uploadImage(event) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref('/images/' + randomId);
    this.task = this.ref.put(event.target.files[0]);
    
    let uploadProgress = this.task.percentageChanges();

    // get notified when the download URL is available
    return new Promise(resolve => {
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL();
          this.downloadURL.subscribe(
            (d) => {
              this.url = d;
              console.log(this.url);
              resolve({url: this.url, progress: uploadProgress});
            }
          )
        })).subscribe(); 
    })
     
  }
  
}
