import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoToggleAllComponent } from './todo-toggle-all.component';

describe('TodoToggleAllComponent', () => {
  let component: TodoToggleAllComponent;
  let fixture: ComponentFixture<TodoToggleAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoToggleAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoToggleAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
