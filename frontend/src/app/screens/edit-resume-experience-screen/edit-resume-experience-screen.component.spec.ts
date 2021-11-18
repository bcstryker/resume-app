import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResumeExperienceScreenComponent } from './edit-resume-experience-screen.component';

describe('EditResumeExperienceScreenComponent', () => {
  let component: EditResumeExperienceScreenComponent;
  let fixture: ComponentFixture<EditResumeExperienceScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResumeExperienceScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResumeExperienceScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
