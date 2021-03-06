import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExperienceScreenComponent } from './screens/edit-experience-screen/edit-experience-screen.component';
import { EditResumeExperienceScreenComponent } from './screens/edit-resume-experience-screen/edit-resume-experience-screen.component';
import { NewExperienceScreenComponent } from './screens/new-experience-screen/new-experience-screen.component';
import { NewResumeScreenComponent } from './screens/new-resume-screen/new-resume-screen.component';
import { NewUserScreenComponent } from './screens/new-user-screen/new-user-screen.component';
import { UserScreenComponent } from './screens/user-screen/user-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  { path: 'portal', component: UserScreenComponent },
  { path: 'portal/:userId', component: UserScreenComponent },
  { path: 'portal/:userId/resumes/:resumeId', component: UserScreenComponent },
  { path: 'new-user', component: NewUserScreenComponent },
  { path: 'portal/:userId/new-resume', component: NewResumeScreenComponent },
  { path: 'portal/:userId/new-experience', component: NewExperienceScreenComponent }, 
  { path: 'portal/:userId/edit-experience', component: EditExperienceScreenComponent },
  { path: 'portal/:userId/resumes/:resumeId/edit-resume-experience', component: EditResumeExperienceScreenComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
