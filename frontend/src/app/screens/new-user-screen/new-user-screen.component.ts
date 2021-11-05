import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserModel from 'src/app/models/userModel';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-new-user-screen',
  templateUrl: './new-user-screen.component.html',
  styleUrls: ['./new-user-screen.component.scss']
})
export class NewUserScreenComponent implements OnInit {

  users: UserModel[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  addNewUser(data: object) {

        this.userService.createUser(data).subscribe(
          (newUser: UserModel) => {
            this.router.navigate(['portal', newUser._id]);
          }
        );
  }
}
