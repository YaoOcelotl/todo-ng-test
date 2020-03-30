import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Router, ActivationEnd } from '@angular/router';
import { Todo } from 'src/app/model/todo';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pending: number = 0;

  completed: number = 0;

  constructor(private todoService: TodoService, private router: Router) {
    // Actualizar conteos durante el cambio de ruta.
    router.events.subscribe(routerEvent => {
      if (routerEvent instanceof ActivationEnd) {
        this.resetCounters();
      }
    });
     // Acualizar el conteo despues de crear un todo
    todoService.postCreateTodoEmmitter.subscribe(
      (todo: Todo) => this.onNewTodo(todo)
    );
    // Acualizar el conteo despues de eliminar un todo
    todoService.postDeleteTodoEmmitter.subscribe(
      (todo: Todo) => this.onDeletedTodo(todo)
    );
    // Acualizar el conteo despues de actulaizar un todo
    todoService.switchStatusEmmitter.subscribe(
      (todo: Todo) => this.onSwitchStatusTodo(todo)
    );
  }

  ngOnInit() {

  }

  async deleteCompleted() {
    console.log('deleteCompleted');
    await this.todoService.deleteCompleted();
  }

  async resetCounters() {
    try {
      this.pending = 0;
      this.completed = 0;
      let delta = 0;
      let filters = { status: null };

      filters.status = Todo.STATUS_PENDING;
      delta = await this.todoService.getCountTodos(filters);
      this.pending += delta;

      filters.status = Todo.STATUS_COMPLETED;
      delta = await this.todoService.getCountTodos(filters);
      this.completed += delta;
    } catch (error) {
      this.pending = 0;
      this.completed = 0;
      console.error(error);
    }
  }

  onNewTodo(todo: Todo) {
    switch (todo.status) {
      case Todo.STATUS_COMPLETED:
        this.completed++;
        break;
      default:
        this.pending++;
        break;
    }
  }

  onDeletedTodo(todo: Todo) {
    switch (todo.status) {
      case Todo.STATUS_COMPLETED:
        this.completed--;
        break;
      default:
        this.pending--;
        break;
    }
  }

  onSwitchStatusTodo(todo: Todo) {
    switch (todo.status) {
      case Todo.STATUS_COMPLETED:
        this.completed++;
        this.pending--;
        break;
      default:
        this.completed--;
        this.pending++;
        break;
    }
  }

}
