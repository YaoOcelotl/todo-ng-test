import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'api/todos';

  constructor(
    private http: HttpClient,
    ) { }

    getTodos (): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
  }
}
