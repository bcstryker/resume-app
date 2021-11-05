import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import ExperienceModel from './models/experienceModel';


@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private apiConfigService: ApiConfigService) { }

  getExperiences(userId: string, resumeId: string): Observable<ExperienceModel[]> {
    return this.apiConfigService.getExperiences(`portal/${userId}/resumes/${resumeId}/experience`);
  }

  createExperience(userId: string, resumeId: string, data: object): Observable<ExperienceModel> {
    return this.apiConfigService.createExperience(`portal/${userId}/resumes/${resumeId}/experience`, data)  
  }

  deleteExperience(userId: string, resumeId: string, experienceId: string): Observable<ExperienceModel> {
    return this.apiConfigService.deleteExperience(`portal/${userId}/resumes/${resumeId}/experience/${experienceId}`);
  }

}
