import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})
export class TodosListComponent implements OnInit {

  todos: Todo[];

  filters: any = {};

  constructor(
    private todoService: TodoService, 
    private location: Location, 
    private router: Router) {
    router.events.subscribe(val => {
      let status = location.path();
      
      switch (status) {
        case '/active':
          this.filters.status = 'pending';
          break;
        case '/completed':
          this.filters.status = 'completed';
          break;
        default:
          delete this.filters.status; 
          break;
      }
      console.log(status, this.filters);
      this.getTodos();
    });
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService
      .getTodos(this.filters)
      .subscribe(todos => this.todos = todos);

  }

}
