import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from '../storage-service/storage.service';
import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private firestore: AngularFirestore, private storageService: StorageService) { }

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

  deleteUser(id: string, imageURL: string) {
    this.firestore.collection("users").doc(id).delete();
    this.storageService.deleteImage(imageURL);
  }

  updateUser(user: User, id: string) {
    
    this.firestore.collection('users').doc(id).valueChanges().subscribe(
      (u: User) => { 
        if(user.image != u.image) {
          this.storageService.deleteImage(u.image);
        }

        this.firestore.collection("users").doc(id).update({
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          image: user.image
        });
      }
        
    )
  }  
  
}
