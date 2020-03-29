import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDivComponent } from './ui-div.component';

describe('UiDivComponent', () => {
  let component: UiDivComponent;
  let fixture: ComponentFixture<UiDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
