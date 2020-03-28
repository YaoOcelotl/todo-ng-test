import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

   @Output() deletedCompletedTodos = new EventEmitter<any>();


  todoStatus: string;

  constructor( location: Location, private router: Router, private todoService: TodoService) {
    router.events.subscribe(val => {
      let status = location.path();
      switch (status) {
        case '/active':
          this.todoStatus = 'pending';
          break;
        case '/completed':
          this.todoStatus = 'completed';
          break;
        default:
          this.todoStatus = undefined;
          break;
      }
    });
  }

  ngOnInit() {

  }

  async deleteCompleted() {
    console.log('deleteCompleted');
    let result: any = await this.todoService.deleteCompleted();
    this.deletedCompletedTodos.emit(result);
  }

}
