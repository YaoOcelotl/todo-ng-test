import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})
export class TodosListComponent implements OnInit {

  todos: Todo[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService
        .getTodos()
        .subscribe(todos => this.todos = todos);
  }

}
