import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';
import { Router, ActivationEnd } from '@angular/router';
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
    private router: Router,
    private messageService: MessageService) {

    // Acualizar listado despues de crear un todo
    todoService.postCreateTodoEmmitter.subscribe(
      (todo: Todo) => this.onNewTodo(todo)
    );
    // Actualizar filtros en base a la ruta
    router.events.subscribe(routerEvent => {
      if (routerEvent instanceof ActivationEnd) {
        this.filters = routerEvent.snapshot.data['filters'];
        this.getTodos();
      }
    });
  }

  ngOnInit() {

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
