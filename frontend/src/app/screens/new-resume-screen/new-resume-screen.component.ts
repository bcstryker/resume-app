import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from 'src/app/resume.service'
import ResumeModel from 'src/app/models/resumeModel';


@Component({
  selector: 'app-new-resume-screen',
  templateUrl: './new-resume-screen.component.html',
  styleUrls: ['./new-resume-screen.component.scss']
})
export class NewResumeScreenComponent implements OnInit {

  public userId!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private resumeService: ResumeService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parameter => {
      this.userId = parameter.userId
    })
  }

  addNewResume(data: object) {
    this.resumeService.createResume(this.userId, data).subscribe(
      (newResume: ResumeModel) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

}
