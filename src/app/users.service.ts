import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: any;
  constructor(private firestore: AngularFirestore) { }

  getUsers():any {
    return this.firestore.collection("users").get();
  }

  getUser():any {
    return this.firestore.collection("users").doc("pJ0A0mJE5Ua1kRhrGkgT").get()
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



   delete(userName: string) {
    let id = '';
     const docRef = this.firestore.collection('users', ref => ref.where("name", "==", userName))
     .snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        id = a.payload.doc.id;
        this.firestore.collection('users').doc(id).delete()
      });
    });;
  }

  update(user:User, userName:string) {
    let id = '';
    const docRef = this.firestore.collection('users', ref => ref.where("name", "==", userName)).snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        id = a.payload.doc.id;
        this.firestore.collection('users').doc(id).update({ 
          name: user.name,
          email: user.email, 
          role: user.role,
          status: user.status,
          crDate: user.crDate,
        });
        window.location.reload();
      });
    });;
    
  }
  }

  
