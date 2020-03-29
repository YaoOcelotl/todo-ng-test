import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';


@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: []
})
export class TodoAddComponent implements OnInit {

  title: string;

  inputBlocked = false;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  async addTodo() {
    try {
      this.inputBlocked = true;
      await this.todoService .addTodo({ title: this.title, status: 'Pending'} as  Todo);
    } catch (error) {
      console.error(error);
    } finally {
      this.title = '';
      this.inputBlocked = false;
    }
  }

}
