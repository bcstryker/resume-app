import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import UserModel from './models/userModel';
import ResumeModel from './models/resumeModel';
import ExperienceModel from './models/experienceModel'

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor( private apiConfigService: ApiConfigService ) { }

  // get all resumes from a user
  getAllResumes( userId: string ): Observable<ResumeModel[]> {
    return this.apiConfigService.getResumes( `portal/${userId}/resumes` );
  }

  // create a resume for a user
  createResume( userId: string, data: object ): Observable<ResumeModel> {
    return this.apiConfigService.createResume( `portal/${userId}/resumes`, data );
  }

  addExperienceToResume( userId: string, resumeId: string, experienceId: string ): Observable<ResumeModel> {
    const data: Object = { "experienceId": experienceId };
    return this.apiConfigService.updateResume( `portal/${userId}/resumes/${resumeId}/addExperience`, data )  
  }

  removeExperienceFromResume( userId: string, resumeId: string, experienceId: string ): Observable<ResumeModel> {
    const data: Object = { "experienceId": experienceId };
    return this.apiConfigService.updateResume( `portal/${userId}/resumes/${resumeId}/removeExperience`, data );
  }

  //delete one task from a specific task list
  deleteResume( userId: string, resumeId: string ): Observable<ResumeModel> {
    return this.apiConfigService.deleteResume( `portal/${userId}/resumes/${resumeId}` );
  }
  
}
