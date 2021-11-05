import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceScreenComponent } from './experience-screen.component';

describe('ExperienceScreenComponent', () => {
  let component: ExperienceScreenComponent;
  let fixture: ComponentFixture<ExperienceScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
