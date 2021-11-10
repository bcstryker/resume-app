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
  currentResume: ResumeModel = {} as ResumeModel;
  experiences: ExperienceModel[] = []; 
  resumeExperience: ExperienceModel[] = [];
  userId: string = '';
  resumeId: string = '';
  resumeTitle: string = '';
  experienceId: string = '';

  constructor(
    private userService: UserService,
    private resumeService: ResumeService,
    private experienceService: ExperienceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe( allUsers => { this.users = allUsers } );
    this.activatedRoute.params.subscribe(
      ( params: Params ) => {
        this.userId = params.userId;
        this.experienceId = params.experienceId;
        this.resumeId = params.resumeId;
        if ( this.userId ) {
          this.experienceService.getExperiences( this.userId ).subscribe(
            ( allExperiences: ExperienceModel[]) => { 
              this.experiences = allExperiences.sort(function (a, b) {
                var dateA = new Date(a.startDate).getTime();
                var dateB = new Date(b.startDate).getTime();
                return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
              });
            }
          );
          this.resumeService.getAllResumes( this.userId ).subscribe(
            ( allResumes: ResumeModel[] ) => { this.resumes = allResumes }
          );
        }
      }
    );  
  }

  addNewUser() {
    this.router.navigate( ['./new-user'] )
  }

  filterExperience( resumeTitle: String ) {

    let currentResume: ResumeModel = {} as ResumeModel;
    this.resumeExperience = [];
    for ( let resume of this.resumes ) {
      if ( resumeTitle === resume.title ) {
        currentResume = resume;
      }
    }
    
    for ( let exp of this.experiences ) {
      if ( currentResume._experienceArray.includes( exp._id ) ) {
        this.resumeExperience = [ ...this.resumeExperience, exp ]
      }
    }
    this.router.navigate( [ `/portal/${this.userId}/resumes/${currentResume._id}` ], { relativeTo: this.activatedRoute } )
  }

  deleteUser( clickedUser: UserModel ) {
    this.userService.deleteUser( clickedUser._id )
      .subscribe(() => {
        this.users = this.users.filter( u => u._id != clickedUser._id );
      });
  }

  addNewResume() {
    if ( this.userId ) {
      this.router.navigate( [ `/portal/${this.userId}/new-resume` ], { relativeTo: this.activatedRoute } )
    } else {
      alert( "Please select a User." );
      return;
    }
  }

  deleteResume( clickedResume: ResumeModel ) {
    this.resumeService.deleteResume( this.userId, clickedResume._id )
      .subscribe( ( deletedResume: ResumeModel ) => {
        this.resumes = this.resumes.filter( r => r._id != deletedResume._id );
      });
  }

  addNewExperience(){
    if ( this.userId ) {
      this.router.navigate( [ `/portal/${this.userId}/new-experience` ]);
    } else {
      alert( "Please select a User." );
      return;
    }
  }

  deleteExperience( experience: ExperienceModel ) {
    this.experienceService.deleteExperience( this.userId, experience._id )
      .subscribe( ( deletedExperience: ExperienceModel ) => {
        this.experiences = this.experiences.filter( e => e._id != deletedExperience._id );
      });
  }

  addExperienceToResume( experience: ExperienceModel ){
    if ( this.resumeId ) {
      this.resumeService.addExperienceToResume( this.userId, this.resumeId, experience._id )
        .subscribe(() => {
          this.resumeExperience = [];

        });
    } else { 
      alert( "Please select a resume." );
    }
  }

  removeExperienceFromResume ( experience: ExperienceModel ) {
    if ( this.resumeId ) {
      this.resumeService.removeExperienceFromResume( this.userId, this.resumeId, experience._id)
        .subscribe();
    } else {
      alert( "Please select a resume." );
    }
  }
}
