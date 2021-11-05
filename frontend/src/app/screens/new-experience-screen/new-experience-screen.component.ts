import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from 'src/app/experience.service';
import ExperienceModel from 'src/app/models/experienceModel';

@Component({
  selector: 'app-new-experience-screen',
  templateUrl: './new-experience-screen.component.html',
  styleUrls: ['./new-experience-screen.component.scss']
})
export class NewExperienceScreenComponent implements OnInit {

  public userId!: string;
  public resumeId!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private experienceService: ExperienceService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parameter => {
      this.userId = parameter.userId
      this.resumeId = parameter.resumeId
    })
  }
  
  addNewExperience(data: object) {
    this.experienceService.createExperience(this.userId, this.resumeId, data).subscribe(
      (newExperience: ExperienceModel) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }
}
