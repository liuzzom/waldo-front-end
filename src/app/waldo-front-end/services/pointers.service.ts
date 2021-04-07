import { Injectable } from '@angular/core';
import {Pointer} from "../domain-model/Pointer";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PointersService {
  private pointersUrl = 'http://localhost:3000/pointers';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  /** PUT a pointer into the server */
  loadPointer(pointer: Pointer){
    console.log(pointer);
    return this.http.post<Pointer>(this.pointersUrl, pointer, this.httpOptions).pipe(
      tap((pointer: Pointer) => console.log(`loaded provider with id: ${pointer.id}`)),
      catchError(this.handleError<Pointer>('loadPointer'))
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
