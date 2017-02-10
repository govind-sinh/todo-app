import { Component, OnInit } from '@angular/core';
import {Jsonp}  from '@angular/http';
// Import class so we can register it as dependency injection token
import {TodoDataService} from './todo-data.service';
import {Todo} from './todo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {
  newTodo: Todo = new Todo();
  todos: Todo[] = [];
  updatedTodo:Todo;

  constructor(private todoDataService: TodoDataService) {
  }

  ngOnInit(): void {
    this.gettodos();
  }

  addTodo():void {
    if(!this.newTodo){ return;}
    this.newTodo.id = this.todos.length+1;
    this.todoDataService.addTodo(this.newTodo)
      .then(todo => {
        this.todos.push(todo);
        this.newTodo = new Todo();
      })
  }

  toggleTodoComplete(todo) {
    this.updatedTodo = new Todo({id:todo.id,title:todo.title,complete:!todo.complete});
    this.todoDataService.updateTodoById(this.updatedTodo)
      .then((todo) => {
        this.todos[todo.id-1].complete = todo.complete;
      });
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id)
      .then(() => {
        this.todos = this.todos.filter(t => t !== todo);
      });
  }

  gettodos(): void {
    this.todoDataService.getAllTodos().then(todos => this.todos = todos);;
  }

}
