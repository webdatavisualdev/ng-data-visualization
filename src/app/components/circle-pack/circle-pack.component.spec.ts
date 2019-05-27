import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePackComponent } from './circle-pack.component';

describe('CirclePackComponent', () => {
  let component: CirclePackComponent;
  let fixture: ComponentFixture<CirclePackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirclePackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
