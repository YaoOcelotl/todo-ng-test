import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  todoStatus: string;

  constructor( location: Location, private router: Router ) {
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

}
