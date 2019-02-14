import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Door } from './door';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DoorService {
  public backendUrl = environment.backendUrl;
  private doorsUrl = this.backendUrl + '/api/doors';  // URL to web api

  constructor(private http: HttpClient) { }

  getDoors(to: string, id: string): Observable<Door[]> {
    const url = `${this.doorsUrl}/${to}/${id}`;
    return this.http.get<Door[]>(url)
      .pipe(
        tap(_ => this.log('fetched doors')),
        catchError(this.handleError('getDoors', []))
      );
  }

  private log(message: string) {
    console.log(`DoorService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}