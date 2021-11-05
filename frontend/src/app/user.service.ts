import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import UserModel from './models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiConfigService: ApiConfigService) { }

  // get all users
  getAllUsers(): Observable<UserModel[]> {
    return this.apiConfigService.getUserList('portal');
  }

  // create a user
  createUser(data: object): Observable<UserModel> {
    return this.apiConfigService.createUser('portal', data);
  }

  //delete user
  deleteUser(userId: string): Observable<UserModel> {
    return this.apiConfigService.deleteUser(`portal/${userId}`);
  }

}
