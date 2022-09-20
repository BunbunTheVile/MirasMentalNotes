import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  @Output()
  public noteCreated = new EventEmitter<Note>();

  @Output()
  public noteDeleted = new EventEmitter<Note>();

  backendUrl: string = "http://localhost:5000/note";

  constructor(private http: HttpClient) { }

  public create(note: Note): Observable<Note> {
    return this.http.post<Note>(this.backendUrl, note);
  }

  public get(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.backendUrl}/${id}`);
  }

  public getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.backendUrl);
  }

  public getAllWithoutContent(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.backendUrl}/empty`);
  }

  public update(note: Note): Observable<Note> {
    return this.http.put<Note>(this.backendUrl, note);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/${id}`);
  }
}
