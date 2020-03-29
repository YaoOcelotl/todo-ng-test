import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosListComponent } from './todo/todos-list/todos-list.component';
import { Todo } from './model/todo';

const routes: Routes = [
  { path: '', component: TodosListComponent, data: { filters: {} } },
  { path: 'active', component: TodosListComponent, data: { filters: { status: Todo.STATUS_PENDING } } },
  { path: 'completed', component: TodosListComponent, data: { filters: { status: Todo.STATUS_COMPLETED } } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
