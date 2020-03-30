import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo } from '../model/todo';
import { Injectable, EventEmitter } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { DeleteCompletedResult } from '../model/util/delete-completed-result';


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

  preUpdateTodoEmmitter: EventEmitter<Todo> = new EventEmitter();

  postUpdateTodoEmmitter: EventEmitter<Todo> = new EventEmitter();

  preDeleteTodoEmmitter: EventEmitter<Todo> = new EventEmitter();

  postDeleteTodoEmmitter: EventEmitter<Todo> = new EventEmitter();

  preDeleteCompletedEmmitter: EventEmitter<void> = new EventEmitter();

  postDeleteCompletedEmmitter: EventEmitter<DeleteCompletedResult> = new EventEmitter();
  
  switchStatusEmmitter: EventEmitter<Todo> = new EventEmitter();

  constructor(
    private http: HttpClient,
    ) { }

  async getTodos (params: any = {}): Promise<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl, { params: params }).toPromise();
  }

  async getCountTodos (params: any = {}): Promise<number> {
    let todos: Todo[] = await this.http.get<Todo[]>(this.todosUrl, { params: params }).toPromise();
    return todos.length;
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

  async updateTodo(todo: Todo) {
    this.preUpdateTodoEmmitter.emit(todo);
    try {
      await this.http.put(this.todosUrl, todo, this.httpOptions).toPromise();
      this.postUpdateTodoEmmitter.emit(todo);
    } catch (error) {
      let errorEvent = { todo: todo, error: error};
      this.postUpdateTodoEmmitter.error(errorEvent);
      throw errorEvent;
    }
  }

  async deleteTodo(todo: Todo) {
    this.preDeleteTodoEmmitter.emit(todo);
    try {
      await this.http.delete(`${this.todosUrl}/${todo.id}`).toPromise();
      this.postDeleteTodoEmmitter.emit(todo);
    } catch (error) {
      let errorEvent = { todo: todo, error: error};
      this.postDeleteTodoEmmitter.error(errorEvent);
      throw errorEvent;
    }
  }

  async deleteCompleted(): Promise<DeleteCompletedResult> {
    this.preDeleteCompletedEmmitter.emit();
    try {
      let elements: Todo[] = await this.getTodos({ status: Todo.STATUS_COMPLETED});
      let element: Todo = null;
      let result: DeleteCompletedResult = new DeleteCompletedResult();
      for (let i = 0; i < elements.length; i++) {
        try {
          element = elements[i];
          await this.deleteTodo(element);
          result.successes.push(element);
        } catch (error) {
          console.error(error);
          result.errors.push(element);
        }
      }
      this.postDeleteCompletedEmmitter.emit(result);
      return result;
    } catch (error) {
      this.postDeleteCompletedEmmitter.error(error);
      throw error;
    }
  }

}
