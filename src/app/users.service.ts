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

  addUser(user: User) {
    this.firestore.collection("users").add({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
  }
}
