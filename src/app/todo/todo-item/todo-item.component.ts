import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deletedTodo = new EventEmitter<Todo>();

  editing = false;

  constructor(private todoService: TodoService, private messageService: MessageService) { }

  ngOnInit() {
  }

  async switchCompleted() {
    switch (this.todo.status) {
      case Todo.STATUS_COMPLETED:
        this.todo.status = Todo.STATUS_PENDING;
         await this.updateTodo(false);
        break;
      default:
        this.todo.status = Todo.STATUS_COMPLETED;
        await this.updateTodo(false);
        break;
    }
    this.messageService.add({ severity: 'success', summary: `ToDo ${this.todo.status}`, detail: this.todo.title } as Message);
  }

  switchEditing() {
    this.editing = (this.todo.status !== Todo.STATUS_COMPLETED && !this.editing);
  }

  async updateTodo(sendMessage = true) {
    try {
      await this.todoService.updateTodo(this.todo).toPromise();
      if (sendMessage) {
         this.messageService.add({ severity: 'success', summary: 'ToDo updated', detail: this.todo.title } as Message);
      }
    } catch ( error) {
      this.messageService.add({ severity: 'error', summary: 'Updated error ', detail: error } as Message);
    }
  }

  async deleteTodo() {
    try {
      await this.todoService.deleteTodo(this.todo).toPromise();
      this.deletedTodo.emit(this.todo);
    } catch ( e ) {
      console.error(e);
      throw e;
    } finally {

    }
  }

}
