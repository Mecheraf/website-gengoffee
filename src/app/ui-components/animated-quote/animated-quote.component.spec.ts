import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedQuoteComponent } from './animated-quote.component';

describe('AnimatedQuoteComponent', () => {
  let component: AnimatedQuoteComponent;
  let fixture: ComponentFixture<AnimatedQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
