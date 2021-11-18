import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExperienceService } from 'src/app/experience.service';
import ExperienceModel from 'src/app/models/experienceModel';
import ResumeModel from 'src/app/models/resumeModel';
import { ResumeService } from 'src/app/resume.service';

@Component({
  selector: 'app-edit-resume-experience-screen',
  templateUrl: './edit-resume-experience-screen.component.html',
  styleUrls: ['./edit-resume-experience-screen.component.scss']
})
export class EditResumeExperienceScreenComponent implements OnInit {

  experiences: ExperienceModel[] = [];
  resumeExperience: ExperienceModel[] = [];
  currentResume: ResumeModel = {} as ResumeModel;
  userId: string = '';
  experienceId: string = '';
  resumeId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private experienceService: ExperienceService,
    private resumeService: ResumeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ( params: Params ) => {
        this.userId = params.userId;
        this.resumeId = params.resumeId;
        this.resumeService.getOneResume( this.userId, this.resumeId )
          .subscribe( (currentResume: ResumeModel ) => { 
            this.currentResume = currentResume;
          });
        this.experienceService.getExperience( this.userId ).subscribe(
          ( allExperiences: ExperienceModel[]) => { 
            this.experiences = allExperiences.sort(function (a, b) {
              var dateA = new Date(a.startDate).getTime();
              var dateB = new Date(b.startDate).getTime();
              return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
            });
            this.filterExperience(this.currentResume._id);
          }
        )
      }
    );
  }

  editResumeExperience( experienceId: string, data: any, description: string ) {
    const resumeId = this.resumeId;
    this.experienceService.getOneExperience( this.userId, experienceId )
      .subscribe(( currentExperience: ExperienceModel ) => {
        if ( !("resumeDescriptions" in currentExperience) ) {
          data["resumeDescriptions"] = {};
        } else {
          data["resumeDescriptions"] = currentExperience.resumeDescriptions;
        }
        data.resumeDescriptions = {...data.resumeDescriptions, [resumeId]: description};
        console.log(data);
        this.experienceService.editExperience(this.userId, experienceId, data)
          .subscribe(() => {this.router.navigate(['../'], {relativeTo: this.activatedRoute})});
      });
  }

  filterExperience( resumeId: string ) {
    this.resumeExperience = [];
    for ( let exp of this.experiences ) {
      if ( this.currentResume._experienceArray.includes( exp._id ) ) {
        this.resumeExperience = [ ...this.resumeExperience, exp ];
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
}
