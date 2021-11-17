import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UserModel from './models/userModel';
import ResumeModel from './models/resumeModel';
import ExperienceModel from './models/experienceModel';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  // users ------------------------------------------------------------------------
  getUserList( url: string ) {
    return this.httpClient.get<UserModel[]>( `${this.API_BASE_URL}/${url}` );
  }
  createUser( url: string, data: Object ) {
    return this.httpClient.post<UserModel>( `${this.API_BASE_URL}/${url}`, data );
  }
  deleteUser( url: string ) {
    return this.httpClient.delete<UserModel>( `${this.API_BASE_URL}/${url}` );
  }
  
  // experience ----------------------------------------------------------------------
  getExperience( url: string ) {
    return this.httpClient.get<ExperienceModel[]>( `${this.API_BASE_URL}/${url}` );
  }
  getOneExperience( url: string ) {
    return this.httpClient.get<ExperienceModel>( `${this.API_BASE_URL}/${url}` );
  }
  createExperience( url: string, data: Object ) {
    return this.httpClient.post<ExperienceModel>( `${this.API_BASE_URL}/${url}`, data );
  }
  updateExperience( url: string, data: Object ) {
    return this.httpClient.patch<ExperienceModel>( `${this.API_BASE_URL}/${url}`, data );
  }
  deleteExperience( url: string ) {
    return this.httpClient.delete<ExperienceModel>( `${this.API_BASE_URL}/${url}` );
  }

  // resumes ------------------------------------------------------------------------
  getOneResume( url: string ) {
    return this.httpClient.get<ResumeModel>( `${this.API_BASE_URL}/${url}` );
  }
  getResumes( url: string ) {
    return this.httpClient.get<ResumeModel[]>( `${this.API_BASE_URL}/${url}` );
  }
  createResume( url: string, data: Object ) {
    return this.httpClient.post<ResumeModel>( `${this.API_BASE_URL}/${url}`, data );
  }
  updateResume( url: string, data: Object ) {
    return this.httpClient.patch<ResumeModel>( `${this.API_BASE_URL}/${url}`, data );
  }
  deleteResume( url: string ) {
    return this.httpClient.delete<ResumeModel>( `${this.API_BASE_URL}/${url}` );
  }
}
