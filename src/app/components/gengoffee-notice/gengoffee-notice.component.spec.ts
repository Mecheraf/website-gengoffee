import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GengoffeeNoticeComponent } from './gengoffee-notice.component';

describe('GengoffeeNoticeComponent', () => {
  let component: GengoffeeNoticeComponent;
  let fixture: ComponentFixture<GengoffeeNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GengoffeeNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GengoffeeNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
