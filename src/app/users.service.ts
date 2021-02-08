import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [new User(1, 'Test', 'test@gmail.com', 'Engineer', 'Single', Date.now())];

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
  }
}
