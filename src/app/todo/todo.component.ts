import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../model/todo';
import { TodosListComponent} from './todos-list/todos-list.component';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {

  @ViewChild(TodosListComponent)
  private list: TodosListComponent;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onNewTodo( todo: Todo) {
    this.list.onNewTodo(todo);
  }

  async onDeletedCompletedTodos(result: any) {
    await this.list.getTodos();

    if (result.successes.length > 0) {
      this.messageService.add({
        severity: 'success',
        summary: 'Complete ToDos deleted',
        detail: `Deleted ${result.successes.length} ToDos`
      } as Message);
    }

    if (result.errors.length > 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Complete ToDos not deleted',
        detail: `${result.errors.length} errors deleting ToDos`
      } as Message);
    }
  }

}
