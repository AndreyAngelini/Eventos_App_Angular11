import { Evento } from './evento.model';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseUrl= 'http://localhost:5000/api/values';

  constructor(private snackbar: MatSnackBar, 
              private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackbar.open(msg, 'X', { 
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top", 
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(evento: Evento): Observable<Evento>
  {
    return this.http.post<Evento>(this.baseUrl, evento).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  } 

  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  read(): Observable<Evento[]>
  {
    return this.http.get<Evento[]>(this.baseUrl)
  } 

  readById(id: string ): Observable<Evento>
  {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Evento>(url)
  } 

  update(evento: Evento): Observable<Evento>
  {
    const url = `${this.baseUrl}/${evento.id}`
    return this.http.put<Evento>(url, evento)
  } 

  delete(id: string ): Observable<Evento>
  {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Evento>(url)
  } 


}
