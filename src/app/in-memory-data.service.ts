import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService  {

  createDb() {
    let todos = [
      {id: 1, title: 'complete angular2 tutorial', complete: true},
      {id: 2, title: 'make demo app', complete: false},
      {id: 3, title: 'test demo app', complete: false},
      {id: 4, title: 'deploy demo app', complete: true}
    ];
    return {todos};
  }

}
