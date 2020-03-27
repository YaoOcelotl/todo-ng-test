import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../model/todo';
import { TodosListComponent} from './todos-list/todos-list.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {

  @ViewChild(TodosListComponent)
  private list: TodosListComponent;

  constructor() { }

  ngOnInit() {
  }

  onNewTodo( todo: Todo){
    this.list.getTodos();
  }

}
