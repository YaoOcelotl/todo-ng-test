import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

   @Output() deletedCompletedTodos = new EventEmitter<any>();

  constructor(private todoService: TodoService) {
    
  }

  ngOnInit() {

  }

  async deleteCompleted() {
    console.log('deleteCompleted');
    let result: any = await this.todoService.deleteCompleted();
    this.deletedCompletedTodos.emit(result);
  }

}
