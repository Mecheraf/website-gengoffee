import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastEventCardComponent } from './past-event-card.component';

describe('PastEventCardComponent', () => {
  let component: PastEventCardComponent;
  let fixture: ComponentFixture<PastEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
