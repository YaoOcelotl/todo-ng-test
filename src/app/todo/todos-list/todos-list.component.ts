import { Component, OnInit, ViewChild} from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';
import { Router, ActivationEnd } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { TodoToggleAllComponent } from '../todo-toggle-all/todo-toggle-all.component';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})
export class TodosListComponent implements OnInit {

  todos: Todo[] = [];

  inputBlocked = false;

  filters: any = {};

  @ViewChild(TodoToggleAllComponent)
  todoToggleAllComponent: TodoToggleAllComponent;

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
      this.todoToggleAllComponent.setSelected(this.todos);
    }
  }

  async onDeletedTodo(todo: Todo) {
    this.todos = this.todos.filter( element => element.id !== todo.id );
    this.messageService.add({
      severity: 'success',
      summary: _('app.list.todo.operation.delete.sumary.success'),
      detail: todo.title } as Message);
    this.todoToggleAllComponent.setSelected(this.todos);
  }

  async onNewTodo(todo: Todo) {
    if ( this.filters.status === undefined || this.filters.status !== Todo.STATUS_COMPLETED ) {
      this.todos.push(todo);
      this.todoToggleAllComponent.setSelected(this.todos);
    }
    this.messageService.add({
      severity: 'success',
      summary: _('app.list.todo.operation.create.sumary.success'),
      detail: todo.title } as Message);

  }

  async onUpdateTodo(todo: Todo) {
    let status = this.filters.status;
    if (status !== undefined && status !== todo.status) {
      this.todos = this.todos.filter( element => element.id !== todo.id );
    }

    if (!this.inputBlocked) {
      this.todoToggleAllComponent.setSelected(this.todos);
    }
    
  }

  async onToggleAll(status: string) {
    this.inputBlocked = true;
    let todos: Todo[] = this.todos;
    let todo: Todo = null;
    for (let i = 0; i < todos.length; i++) {
      todo = todos[i];
      if (todo.status !== status) {
        todo.status = status;
        try {
          await this.todoService.updateTodo(todo);
          this.todoService.switchStatusEmmitter.emit(todo);
        } catch (error) {
          console.error(error);
        }
      }
    }
    this.inputBlocked = false;
  }

}
