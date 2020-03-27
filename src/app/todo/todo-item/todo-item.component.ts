import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  constructor() { }

  ngOnInit() {
  }

  switchCompleted() {
    switch(this.todo.status){
      case 'Completed':
        this.todo.status = 'Pending';
        break;
      default:
        this.todo.status = 'Completed';
        break;
    }
  }

}
