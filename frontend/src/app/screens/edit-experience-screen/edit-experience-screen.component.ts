import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExperienceService } from 'src/app/experience.service';
import ExperienceModel from 'src/app/models/experienceModel';
import ResumeModel from 'src/app/models/resumeModel';
import { ResumeService } from 'src/app/resume.service';

@Component({
  selector: 'app-edit-experience-screen',
  templateUrl: './edit-experience-screen.component.html',
  styleUrls: ['./edit-experience-screen.component.scss']
})
export class EditExperienceScreenComponent implements OnInit {

  experiences: ExperienceModel[] = [];
  userId: string = '';
  experienceId: string = '';
  resumeId: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private experienceService: ExperienceService,
    private resumeService: ResumeService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ( params: Params ) => {
        this.userId = params.userId;
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
        }
      }
    );
  }

  editExperience(experienceId: string, data: object) {
    this.experienceService.editExperience(this.userId, experienceId, data)
      .subscribe(() => {this.router.navigate(['../'], {relativeTo: this.activatedRoute})});
  }
}
