import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleCirclePackComponent } from './double-circle-pack.component';

describe('DoubleCirclePackComponent', () => {
  let component: DoubleCirclePackComponent;
  let fixture: ComponentFixture<DoubleCirclePackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleCirclePackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleCirclePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
