import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo } from '../model/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    ) { }

  getTodos (): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http
               .post<Todo>(this.todosUrl, todo, this.httpOptions);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions);
  }

}
