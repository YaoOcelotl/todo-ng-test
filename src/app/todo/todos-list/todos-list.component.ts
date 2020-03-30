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

  inputBlocked = false;

  filters: any = {};

  constructor(
    private todoService: TodoService,
    private router: Router,
    private messageService: MessageService) {

    // Acualizar listado despues de crear un todo
    todoService.postCreateTodoEmmitter.subscribe(
      (todo: Todo) => this.onNewTodo(todo)
    );
    // Acualizar listado despues de eliminar un todo
    todoService.postDeleteTodoEmmitter.subscribe(
      (todo: Todo) => this.onDeletedTodo(todo)
    );
    // Actualizar  listado despues de actualizar un todo
    todoService.postUpdateTodoEmmitter.subscribe(
      (todo: Todo) => this.onUpdateTodo(todo),
      (todo: Todo) => this.getTodos(),
    );
    // Bloqueo del listado durante la eliminación de todos completados
    todoService.preDeleteCompletedEmmitter.subscribe(
      () => {
        let status = this.filters.status;
        this.inputBlocked = ( status === undefined || status === Todo.STATUS_COMPLETED);
      }
    );
    // Desbloqueo del listado despues la eliminación de todos completados
    todoService.postDeleteCompletedEmmitter.subscribe(
      () => {
        this.inputBlocked = false;
      },
      () => {
        this.inputBlocked = false;
      }
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
    this.inputBlocked = true;
    try {
      this.todos = await this.todoService.getTodos(this.filters);
    } catch (error) {
      console.error(error);
      this.todos = [];
    } finally {
      this.inputBlocked = false;
    }
  }

  async onDeletedTodo(todo: Todo) {
    this.todos = this.todos.filter( element => element.id !== todo.id );
    this.messageService.add({ severity: 'success', summary: 'ToDo deleted', detail: todo.title } as Message);
  }

  async onNewTodo(todo: Todo) {
    if ( this.filters.status === undefined || this.filters.status !== Todo.STATUS_COMPLETED ) {
      this.todos.push(todo);
    }
    this.messageService.add({ severity: 'success', summary: 'ToDo created', detail: todo.title } as Message);
  }

  async onUpdateTodo(todo: Todo) {
    let status = this.filters.status;
    if (status !== undefined && status !== todo.status) {
      this.todos = this.todos.filter( element => element.id !== todo.id );
    }
  }

}
