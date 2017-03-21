import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers }          from '@angular/http';
import { Todo } from '../../todo';
import { Todos } from './sampleTodo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  addTaskUrl:string;
  getTodos(): Observable<Todo[]> {
    return this.http.get('/api/todos')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addTask (text: string): Observable<Todo[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addTaskUrl, { text }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
}
  deleteTask(_id:string): Observable<Todo[]>{
    return this.http.delete('/api/todos/'+_id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  constructor(private http:Http) { 
    this.addTaskUrl = '/api/todos';
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }
  
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
}
