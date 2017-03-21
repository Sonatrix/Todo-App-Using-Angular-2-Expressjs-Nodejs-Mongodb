import { Component, OnInit,Input } from '@angular/core';
import { Todo } from '../../todo'; 
import { TodoService } from './todo.service';
import { Todos } from './sampleTodo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.css','./todo.component.css'],
  providers:[TodoService]
})

export class TodoComponent implements OnInit {
  @Input()
  title:String;

  todos: Todo[];
  loading:Boolean;
  error:String;
  constructor(private todoservice:TodoService){
    
  }
  getTodos(): void {
    this.todoservice.getTodos()
                     .subscribe(
                       todos => this.todos = todos,
                       error =>  this.error = <any>error);
  }

  ngOnInit() {
    this.getTodos();
    this.todos = this.todos ||[];
    this.loading = true;
    //setTimeout(()=>{this.loading = this.todos.length>0?true:false;console.log(this.todos);},200);
    //console.log(this.todos);
  }

  deleteTodo(id){
    if (!id) { return; }
    this.todoservice.deleteTask(id)
                   .subscribe(
                     todo  => this.todos = todo,
                     error =>  this.error = <any>error);
  }
  createTodo(valueText){
    if (!valueText) { return; }
    this.todoservice.addTask(valueText)
                   .subscribe(
                     todo  => this.todos = todo,
                     error =>  this.error = <any>error);
    //console.log(this.todos);
  }
}
