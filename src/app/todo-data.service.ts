import { Injectable } from '@angular/core';
import { Headers, Http, Response, Jsonp, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Todo} from './todo';

@Injectable()
export class TodoDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 4;

  // Placeholder for todo's
  todos: Todo[] = [];
  private todosUrl = '/app/todos';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }
  
  // Simulate POST /todos
  addTodo(newTodo: Todo): Promise<Todo> {
    newTodo.id = ++this.lastId;
    return this.http
      .post(this.todosUrl, newTodo,{headers:this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): Promise<void> {
    const url = `${this.todosUrl}/${id}`;
    return this.http
      .delete(url,{headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // Simulate PUT /todos/:id
  updateTodoById(updatedTodo:Todo): Promise<Todo> {
    // let todo = this.getTodoById(id);
     const url = `${this.todosUrl}/${updatedTodo.id}`;
    if (!updatedTodo) {
      return null;
    }
    return this.http
      .put(url,updatedTodo,{headers : this.headers})
      .toPromise()
      .then(() => updatedTodo)
      .catch(this.handleError);
  }

  // Simulate GET /todos
  getAllTodos(): Promise<Todo[]> {
    return this.http.get(this.todosUrl)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Promise<Todo> {
    const url = `${this.todosUrl}/${id}`;
    console.log("update :"+id);
    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Toggle todo complete
  // toggleTodoComplete(todo: Todo){
  //   console.log("got toggle todo:"+todo.title);
  //   // let updatedTodo = this.updateTodoById(todo.id, {
  //   //   complete: !todo.complete
  //   // });
  //   console.log("toggle data:"+updatedTodo)
  //   return updatedTodo;
  // }

  private extractData(res: Response) {
    console.log("data:"+JSON.stringify(res.json().data));
    let body = res.json();
    return body.data || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
