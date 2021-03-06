import {Injectable} from '@angular/core';
import {Pointer} from "../domain-model/Pointer";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PointersService {
  private pointersUrl = 'http://localhost:3000/pointers';
  private modelsUrl = 'http://localhost:3000/models';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) {}

  /** GET pointers by model id. Will 404 if id not found */
  getPointersByModelId(modelId: string): Observable<Pointer[]> {
    const url = `${this.modelsUrl}/${modelId}/pointers`;
    return this.http.get<Pointer[]>(url).pipe(
      tap(_ => console.log(`Fetched pointers related with model with id: ${modelId}`)),
      catchError(this.handleError<Pointer[]>(`getPointers model id:${modelId}`))
    );
  }

  /** GET pointer by id. Will 404 if id not found */
  getPointer(id: string): Observable<Pointer> {
    const url = `${this.pointersUrl}/${id}`;
    return this.http.get<Pointer>(url).pipe(
      tap(_ => console.log(`Fetched pointer with id: ${id}`)),
      catchError(this.handleError<Pointer>(`getModel id:${id}`))
    );
  }

  /** DELETE a model from the server */
  deletePointer(pointerId: string): Observable<Pointer> {
    const id = pointerId;
    const url = `${this.pointersUrl}/${id}`;

    return this.http.delete<Pointer>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deleted pointer with id: ${id}`)),
      catchError(this.handleError<Pointer>('deletePointer'))
    );
  }


  /** PUT a pointer into the server */
  loadPointer(pointer: Pointer) {
    return this.http.post<Pointer>(this.pointersUrl, pointer, this.httpOptions).pipe(
      tap((pointer: Pointer) => console.log(`Loaded provider with id: ${pointer.id}`)),
      catchError(this.handleError<Pointer>('loadPointer'))
    );
  }

  /** PATCH a model into the server */
  editPointer(pointerId: string, newData: any) {
    const url = `${this.pointersUrl}/${pointerId}`;

    return this.http.patch<Pointer>(url, newData, this.httpOptions).pipe(
      tap((pointer: Pointer) => console.log(`Edited pointer with id: ${pointer.id}`)),
      catchError(this.handleError<Pointer>('editModel'))
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
