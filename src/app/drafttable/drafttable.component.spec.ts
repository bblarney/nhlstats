import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrafttableComponent } from './drafttable.component';

describe('DrafttableComponent', () => {
  let component: DrafttableComponent;
  let fixture: ComponentFixture<DrafttableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrafttableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrafttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
