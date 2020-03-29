import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo } from '../model/todo';
import { Injectable, EventEmitter } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  preCreateTodoEmmitter: EventEmitter<Todo> = new EventEmitter();

  postCreateTodoEmmitter: EventEmitter<Todo> = new EventEmitter();

  constructor(
    private http: HttpClient,
    ) { }

  getTodos (params: any = {}): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl, { params: params });
  }

  async addTodo(todo: Todo): Promise<Todo> {
    this.preCreateTodoEmmitter.emit(todo);
    try {
      let persisted: Todo = await this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).toPromise();
      this.postCreateTodoEmmitter.emit(persisted);
      return persisted;
    } catch (error) {
      let errorEvent = { todo: todo, error: error};
      this.postCreateTodoEmmitter.error(errorEvent);
      throw errorEvent;
    }
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions);
  }

  deleteTodo(todo: Todo): Observable<any> {
    return this.http.delete(`${this.todosUrl}/${todo.id}`);
  }

  async deleteCompleted(): Promise<any> {
    let elements = await this.getTodos({ status: 'completed'}).toPromise();
    let element: Todo = null;
    let result = { successes: [], errors: []};
    for (let i = 0; i < elements.length; i++) {
      try {
        element = elements[i];
        await this.deleteTodo(element).toPromise();
        result.successes.push(element);
      } catch (error) {
        console.error(error);
        result.errors.push(element);
      }
    }
    return result;
  }

}
