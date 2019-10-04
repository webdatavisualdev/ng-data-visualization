import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectPackComponent } from './rect-pack.component';

describe('RectPackComponent', () => {
  let component: RectPackComponent;
  let fixture: ComponentFixture<RectPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
