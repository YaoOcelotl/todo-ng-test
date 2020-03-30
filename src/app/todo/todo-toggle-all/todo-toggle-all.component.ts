import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/model/todo';

@Component({
  selector: 'app-todo-toggle-all',
  templateUrl: './todo-toggle-all.component.html',
  styleUrls: ['./todo-toggle-all.component.scss']
})
export class TodoToggleAllComponent implements OnInit {

  selected = null;

  @Output() toggleAll = new EventEmitter<string>();


  constructor() {
    
  }

  ngOnInit(): void {
  }

  async markAllTodos() {
    this.toggleAll.emit(this.selected ? Todo.STATUS_COMPLETED : Todo.STATUS_PENDING);
  }

  async setSelected(todos: Todo[]) {
    let completed = 0;
    let pending = 0;
    todos.forEach( (todo: Todo) => {
      if(todo.status === Todo.STATUS_COMPLETED) {
        completed++;
      } else {
        pending++;
      }
    });
    if (completed > 0 && pending === 0) {
      this.selected = true;
    } else if (completed === 0 && pending > 0) {
      this.selected = false;
    } else {
      this.selected = null;
    }
  }
}
