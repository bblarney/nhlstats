import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StattableComponent } from './stattable.component';

describe('StattableComponent', () => {
  let component: StattableComponent;
  let fixture: ComponentFixture<StattableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StattableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StattableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
