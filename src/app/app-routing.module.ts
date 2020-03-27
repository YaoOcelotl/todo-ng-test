import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosListComponent } from './todo/todos-list/todos-list.component';

const routes: Routes = [
  { path: '', component: TodosListComponent },
  { path: 'active', component: TodosListComponent },
  { path: 'completed', component: TodosListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
