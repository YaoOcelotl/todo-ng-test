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
  @Output() newTodo = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  addTodo() {
    this.todoService
        .addTodo({ title: this.title, status: 'Pending'} as  Todo)
        .subscribe(
          (todo) => {
            this.newTodo.emit(todo);
          },
          (error) => console.error(error)
        );
    this.title = '';
  }

}
