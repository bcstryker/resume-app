import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExperienceScreenComponent } from './edit-experience-screen.component';

describe('EditExperienceScreenComponent', () => {
  let component: EditExperienceScreenComponent;
  let fixture: ComponentFixture<EditExperienceScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExperienceScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExperienceScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
