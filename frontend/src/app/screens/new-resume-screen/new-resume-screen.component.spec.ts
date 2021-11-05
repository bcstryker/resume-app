import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeScreenComponent } from './resume-screen.component';

describe('ResumeScreenComponent', () => {
  let component: ResumeScreenComponent;
  let fixture: ComponentFixture<ResumeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
