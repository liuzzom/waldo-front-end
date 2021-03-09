import {Injectable} from '@angular/core';
import {MODELS} from "../mock-models";
import {Model} from "../domain-model/Model";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private modelsUrl = 'http://localhost:3000/models'

  constructor(
    private http: HttpClient
  ) {}

  /** GET models from the server */
  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.modelsUrl)
      .pipe(
        tap(_ => console.log('fetched models')),
        catchError(this.handleError<Model[]>('getModels', []))
      );
  }

  /** GET model by id. Will 404 if id not found */
  getModel(id: string): Observable<Model>{
    const url = `${this.modelsUrl}/${id}`;
    return this.http.get<Model>(url);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
