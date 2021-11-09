import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import ExperienceModel from './models/experienceModel';


@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor( private apiConfigService: ApiConfigService ) { }

  getExperiences( userId: string ): Observable<ExperienceModel[]> {
    return this.apiConfigService.getExperiences( `portal/${userId}/experience` );
  }

  createExperience(userId: string, data: object): Observable<ExperienceModel> {
    return this.apiConfigService.createExperience( `portal/${userId}/experience`, data )  
  }

  deleteExperience( userId: string, experienceId: string ): Observable<ExperienceModel> {
    return this.apiConfigService.deleteExperience( `portal/${userId}/experience/${experienceId}` );
  }

}
