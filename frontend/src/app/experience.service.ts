import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import ExperienceModel from './models/experienceModel';


@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor( private apiConfigService: ApiConfigService ) { }

  getExperience( userId: string ): Observable<ExperienceModel[]> {
    return this.apiConfigService.getExperience( `portal/${userId}/experience` );
  }

  getOneExperience( userId: string, experienceId: string ): Observable<ExperienceModel> {
    return this.apiConfigService.getOneExperience( `portal/${userId}/experience/${experienceId}`)
  }

  createExperience(userId: string, data: object): Observable<ExperienceModel> {
    return this.apiConfigService.createExperience( `portal/${userId}/experience`, data )  
  }

  deleteExperience( userId: string, experienceId: string ): Observable<ExperienceModel> {
    return this.apiConfigService.deleteExperience( `portal/${userId}/experience/${experienceId}` );
  }

  editExperience( userId: string, experienceId: string, data: object ): Observable<ExperienceModel> {
    return this.apiConfigService.updateExperience( `portal/${userId}/experience/${experienceId}`, data)
  }

  editResumeExperience( userId: string, experienceId: string, data: object ): Observable<ExperienceModel> {
    return this.apiConfigService.updateExperience( `portal/${userId}/experience/${experienceId}`, data)
  }

}
