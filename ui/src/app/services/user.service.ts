import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserEdit, UserRegister } from '../models/user';
import { backendUrl } from '../constants';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  register(user: UserRegister) {
    return this.http.post(backendUrl.authService.register, user) as any;
  }

  getUser(id: string) {
    return this.http.get(backendUrl.userService.getUser + id) as any;
  }

  updateUser(id: string, user: UserEdit) {
    return this.http.put(backendUrl.userService.saveUser + id, user) as any;
  }
}