import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';
import { Message, MessageService } from 'primeng/api';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

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
        this.messageService.add({
          severity: 'success',
          summary: _('app.list.todo.operation.switch_status.pending.sumary.success'),
          detail: this.todo.title } as Message);
        break;
      default:
        this.todo.status = Todo.STATUS_COMPLETED;
        await this.updateTodo(false);
        this.messageService.add({
          severity: 'success',
          summary: _('app.list.todo.operation.switch_status.completed.sumary.success'),
          detail: this.todo.title } as Message);
        break;
    }
    this.todoService.switchStatusEmmitter.emit(this.todo);
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
        this.messageService.add({
          severity: 'success',
          summary: _('app.list.todo.operation.update.sumary.success'),
          detail: this.todo.title } as Message);
      }
    } catch ( error) {
      this.messageService.add({
        severity: 'error',
        summary: _('app.list.todo.operation.update.sumary.error'),
        detail: this.todo.title } as Message);
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
