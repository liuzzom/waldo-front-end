import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Model} from "../domain-model/Model";
import {catchError, tap} from "rxjs/operators";
import {Provider} from "../domain-model/Provider";

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  private providersUrl = 'http://localhost:3000/providers';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) {}

  /** GET provider by id. Will 404 if id not found */
  getProvider(id: string): Observable<Provider> {
    const url = `${this.providersUrl}/${id}`;

    return this.http.get<Provider>(url).pipe(
      tap(_ => console.log(`Fetched provider with id: ${id}`)),
      catchError(this.handleError<Provider>(`getModel id:${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
