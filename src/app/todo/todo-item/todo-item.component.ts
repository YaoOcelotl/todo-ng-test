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

  editing = false;

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

  switchEditing() {
    this.editing = (this.todo.status !== 'Completed' && !this.editing);
  }

  updateTodo() {
    this.todoService.updateTodo(this.todo).subscribe(
          _ => {
            console.log('saved', this.todo);
            this.editing = false;
          },
          (error) => console.error(error)
        );
  }

}
