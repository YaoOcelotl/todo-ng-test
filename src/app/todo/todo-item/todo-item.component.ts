import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @ViewChild('editInput') input: ElementRef;

  editing = false;

  inputBlocked = false;

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
    this.todoService.switchStatusEmmitter.emit(this.todo);
    this.messageService.add({ severity: 'success', summary: `ToDo ${this.todo.status}`, detail: this.todo.title } as Message);
  }

  switchEditing() {
    if ( ( this.editing = (this.todo.status !== Todo.STATUS_COMPLETED && !this.editing) ) ) {
      setTimeout(() => this.input.nativeElement.focus(), 0);
    }

  }

  async updateTodo(sendMessage = true) {
    try {
      this.inputBlocked = true;
      await this.todoService.updateTodo(this.todo);
      if (sendMessage) {
         this.messageService.add({ severity: 'success', summary: 'ToDo updated', detail: this.todo.title } as Message);
      }
    } catch ( error) {
      this.messageService.add({ severity: 'error', summary: 'Updated error ', detail: error } as Message);
    }
    finally {
      this.inputBlocked = false;
    }
  }

  async deleteTodo() {
    try {
      this.inputBlocked = true;
      await this.todoService.deleteTodo(this.todo);
    } catch ( e ) {
      console.error(e);
    } finally {
      this.inputBlocked = false;
    }
  }

}
