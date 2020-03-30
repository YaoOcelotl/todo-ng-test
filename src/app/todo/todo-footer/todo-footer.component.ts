import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  constructor(private todoService: TodoService) {

  }

  ngOnInit() {

  }

  async deleteCompleted() {
    console.log('deleteCompleted');
    await this.todoService.deleteCompleted();
  }

}
