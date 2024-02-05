import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsItemComponent } from './jobs-item.component';

describe('JobsItemComponent', () => {
  let component: JobsItemComponent;
  let fixture: ComponentFixture<JobsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
