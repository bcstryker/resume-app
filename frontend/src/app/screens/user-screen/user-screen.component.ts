import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/resume.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import UserModel from 'src/app/models/userModel';
import ResumeModel from 'src/app/models/resumeModel';
import ExperienceModel from 'src/app/models/experienceModel';
import { UserService } from 'src/app/user.service';
import { ExperienceService } from 'src/app/experience.service';

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.scss']
})
export class UserScreenComponent implements OnInit {

  users: UserModel[] = [];
  resumes: ResumeModel[] = [];
  experiences: ExperienceModel[] = []; 
  userId: string = '';
  resumeId: string = '';

  constructor(
    private userService: UserService,
    private resumeService: ResumeService,
    private experienceService: ExperienceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(allUsers => {this.users = allUsers;});
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params.userId;
        this.resumeId = params.resumeId;
        if (this.userId) {
          this.resumeService.getAllResumes(this.userId).subscribe(
            (allResumes: ResumeModel[]) => { this.resumes = allResumes }
          );
        }
        if (this.userId && this.resumeId) {
          this.experienceService.getExperiences(this.userId, this.resumeId).subscribe(
            (allExperiences: ExperienceModel[]) => { this.experiences = allExperiences }
          );
        }
      }
    );  
  }

  addNewUser() {
    this.router.navigate(['./new-user'])
  }

  deleteUser(clickedUser: UserModel) {
    this.userService.deleteUser(clickedUser._id)
      .subscribe(() => {
        this.users = this.users.filter(u => u._id != clickedUser._id);
      });
  }

  addNewResume() {
    if (this.userId) {
      this.router.navigate(['./new-resume'], { relativeTo: this.activatedRoute})
    } else {
      alert("Please select a User.");
      return;
    }
  }

  deleteResume(resume: ResumeModel) {
    this.resumeService.deleteResume(this.userId, resume._id)
      .subscribe((deletedResume: ResumeModel) => {
        this.resumes = this.resumes.filter(r => r._id != deletedResume._id);
      });
  }

  addNewExperience(){
    if (this.userId && this.resumeId) {
      this.router.navigate(['./new-experience'], { relativeTo: this.activatedRoute});
    } else {
      alert("Please select a resume.");
      return;
    }
  }

  deleteExperience(experience: ExperienceModel) {
    this.experienceService.deleteExperience(this.userId, this.resumeId, experience._id)
      .subscribe((deletedExperience: ExperienceModel) => {
        this.experiences = this.experiences.filter(e => e._id != deletedExperience._id);
      });
  }
}