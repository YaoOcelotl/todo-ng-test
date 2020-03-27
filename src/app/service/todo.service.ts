import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo } from '../model/todo';
import { Injectable } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

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

  getTodos (params: any = {}): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl, { params: params });
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http
               .post<Todo>(this.todosUrl, todo, this.httpOptions);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions);
  }

  deleteTodo(todo: Todo): Observable<any> {
    return this.http.delete(`${this.todosUrl}/${todo.id}`);
  }

  async deleteCompleted(): Promise<Todo[]> {
    let elements = await this.getTodos({ status: 'completed'}).toPromise();
    for (let i = 0; i < elements.length; i++) {
      await this.deleteTodo(elements[i]).toPromise();
    }
    return elements;
  }

}
