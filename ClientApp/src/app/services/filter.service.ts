import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private searchQueries: { [key: string]: BehaviorSubject<string> } = {};

  constructor() {
  }

  setSearchQuery(key: string, query: string): void {
    if (!this.searchQueries[key]) {
      this.searchQueries[key] = new BehaviorSubject<string>('');
    }
    this.searchQueries[key].next(query);
  }

  getSearchQuery(key: string): Observable<string> {
    if (!this.searchQueries[key]) {
      this.searchQueries[key] = new BehaviorSubject<string>('');
    }
    return this.searchQueries[key].asObservable();
  }
}
