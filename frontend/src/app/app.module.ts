import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserScreenComponent } from './screens/user-screen/user-screen.component';
import { NewResumeScreenComponent } from './screens/new-resume-screen/new-resume-screen.component';
import { NewExperienceScreenComponent } from './screens/new-experience-screen/new-experience-screen.component';
import { NewUserScreenComponent } from './screens/new-user-screen/new-user-screen.component';
import { EditExperienceScreenComponent } from './screens/edit-experience-screen/edit-experience-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    UserScreenComponent,
    NewResumeScreenComponent,
    NewExperienceScreenComponent,
    NewUserScreenComponent,
    EditExperienceScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
