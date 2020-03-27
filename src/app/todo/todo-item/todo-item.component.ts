import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  switchCompleted() {
    switch(this.todo.status) {
      case 'Completed':
        this.todo.status = 'Pending';
        this.updateTodo();
        break;
      default:
        this.todo.status = 'Completed';
        this.updateTodo();
        break;
    }
  }

  updateTodo() {
    this.todoService.updateTodo(this.todo).subscribe(
          _ => {
            console.log('saved', this.todo);
          },
          (error) => console.error(error)
        );
  }

}
