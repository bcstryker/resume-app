import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/resume.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
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
  resumeSelected: boolean = false;
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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe( allUsers => { this.users = allUsers } );
    this.activatedRoute.params.subscribe(
      ( params: Params ) => {
        this.userId = params.userId;
        this.experienceId = params.experienceId;
        this.resumeId = params.resumeId;
        if ( this.userId ) {
          this.experienceService.getExperience( this.userId ).subscribe(
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

  updateResumeTitle() {
    this.resumeTitle = (document.getElementById("resumeTitle") as HTMLSelectElement).value;
    // console.log(this.resumeTitle);
    this.filterExperience(this.resumeTitle);
    this.resumeSelected = true;
    this.cdr.detectChanges();
  }

  addNewUser() {
    this.router.navigate( ['./new-user'] )
  }

  filterExperience( resumeId: string ) {
    this.resumeExperience = [];
    for ( let resume of this.resumes ) {
      if ( resumeId === resume._id ) {
        this.currentResume = resume;
      }
    }
    for ( let exp of this.experiences ) {
      if ( this.currentResume._experienceArray.includes( exp._id ) ) {
        this.resumeExperience = [ ...this.resumeExperience, exp ]
      }
      for ( let exp of this.resumeExperience ) {
        if ( exp.resumeDescriptions && resumeId in exp.resumeDescriptions) {
            exp["currentDescription"] = exp.resumeDescriptions[resumeId];
        } else {
          exp["currentDescription"] = exp["description"];
        }
      }
    }
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

  editResumeExperience() {
    if ( this.resumeSelected ) {
      this.router.navigate( [`/portal/${this.userId}/resumes/${this.currentResume._id}/edit-resume-experience`] );
    } else {
      alert( "Please select a resume." );
      return;
    }
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

  editExperience() {
    this.router.navigate( [`/portal/${this.userId}/edit-experience`] )
  }

  addExperienceToResume( experience: ExperienceModel ){
    if ( this.currentResume._id ) {
      this.resumeService.addExperienceToResume( this.userId, this.currentResume._id, experience._id )
        .subscribe( ( updatedResume ) => {
          for ( let resume of this.resumes ) {
            if ( resume._id === updatedResume._id) {
              resume._experienceArray = updatedResume._experienceArray;
              this.filterExperience(resume._id);
            }
          }
        });
    } else { 
      alert( "Please select a resume." );
    }
  }

  removeExperienceFromResume ( experience: ExperienceModel ) {
    if ( this.currentResume._id ) {
      this.resumeService.removeExperienceFromResume( this.userId, this.currentResume._id, experience._id)
        .subscribe( ( updatedResume ) => {
          for ( let resume of this.resumes ) {
            if ( resume._id === updatedResume._id) {
              resume._experienceArray = updatedResume._experienceArray;
              this.filterExperience(resume._id);
            }
          }
        });
    } else {
      alert( "Please select a resume." );
    }
  }
}
