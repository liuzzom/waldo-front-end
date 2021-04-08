import {Injectable} from '@angular/core';
import {Model} from "../domain-model/Model";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private modelsUrl = 'http://localhost:3000/models';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) {}

  /** GET models from the server */
  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.modelsUrl).pipe(
      tap(_ => console.log('fetched models')),
      catchError(this.handleError<Model[]>('getModels', []))
    );
  }

  /** GET model by id. Will 404 if id not found */
  getModel(id: string): Observable<Model> {
    const url = `${this.modelsUrl}/${id}`;
    return this.http.get<Model>(url).pipe(
      tap(_ => console.log(`fetched model with id: ${id}`)),
      catchError(this.handleError<Model>(`getModel id:${id}`))
    );
  }

  /** GET model searching by name */
  searchByName(name: string) {
    const url = `${this.modelsUrl}/?name=${name}`;
    return this.http.get<Model[]>(url).pipe(
      tap(res => {
        res.length ? console.log(`found model matching ${name}`) : console.log(`no models matching ${name}`)
      }),
      catchError(this.handleError<Model[]>('searchByName', []))
    );
  }

  /** DELETE a model from the server */
  deleteModel(model: Model): Observable<Model> {
    const id = model.id;
    const url = `${this.modelsUrl}/${id}`;

    return this.http.delete<Model>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted model with id: ${id}`)),
      catchError(this.handleError<Model>('deleteModel'))
    );
  }

  /** PUT a model into the server */
  loadModel(newModel: Model) {
    return this.http.post<Model>(this.modelsUrl, newModel, this.httpOptions).pipe(
      tap((model: Model) => console.log(`loaded model with id: ${model.id}`)),
      catchError(this.handleError<Model>('loadModel'))
    );
  }

  /** PATCH a model into the server */
  editModel(newData: any) {
    const id = newData.id;
    const url = `${this.modelsUrl}/${id}`;

    return this.http.patch<Model>(url, newData, this.httpOptions).pipe(
      tap((model: Model) => console.log(`edited hero with id: ${model.id}`)),
      catchError(this.handleError<Model>('editModel'))
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
