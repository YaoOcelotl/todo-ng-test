import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import {Message, MessageService} from 'primeng/api';

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
    private router: Router,
    private messageService: MessageService) {
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

  async getTodos() {
    this.todos = await this.todoService .getTodos(this.filters).toPromise();
  }

  async onDeletedTodo(todo: Todo) {
    this.todos = this.todos.filter( element => element.id !== todo.id );
    this.messageService.add({ severity: 'success', summary: 'ToDo deleted', detail: todo.title } as Message);
  }

  async onNewTodo(todo: Todo) {
    this.todos.push(todo);
    this.messageService.add({ severity: 'success', summary: 'ToDo created', detail: todo.title } as Message);
  }

}
