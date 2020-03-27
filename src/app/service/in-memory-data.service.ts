import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../model/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

   createDb() {
    const todos = [
      { id: 1, title: 'Beat Thanos', status: 'Pending' },
      { id: 2, title: 'Save the world', status: 'Completed' },
      { id: 3, title: 'Borrow the Suit from iron-Man', status: 'Pending' },
    ];
    return {todos};
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }
}
