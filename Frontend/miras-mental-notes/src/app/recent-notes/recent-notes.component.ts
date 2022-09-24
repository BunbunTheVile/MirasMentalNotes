import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../models/note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-recent-notes',
  templateUrl: './recent-notes.component.html',
  styleUrls: ['./recent-notes.component.css']
})
export class RecentNotesComponent implements OnInit {

  notes: Note[] = [];
  deletesInitiated = new Map<number, boolean>();

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.noteService.getAllWithoutContent().subscribe(x => {
      this.notes = x;
      this.notes.forEach(note => this.deletesInitiated.set(note.id!, false));
      this.sortNotes();
    });
    
    this.noteService.noteCreated.subscribe(x => {
      this.notes.push(x);
      this.deletesInitiated.set(x.id!, false);
      this.selectNote(x.id!);
      this.sortNotes();
    });

    this.noteService.noteDeleted.subscribe(x => {
      this.notes = this.notes.filter(note => note.id !== x.id);
      this.selectNote(0);
      this.sortNotes();
    });
  }

  public selectNote(id: number): void {
    this.router.navigate(["view", id]);
  }

  public initiateDelete(id: number): void {
    this.deletesInitiated.set(id, true);
  }

  public stopDelete(id: number): void {
    this.deletesInitiated.set(id, false);
  }

  public delete(id: number): void {
    this.noteService.delete(id).subscribe(() => {
      this.noteService.noteDeleted.emit(this.notes.find(x => x.id === id));
    });
  }

  private sortNotes(): void {
    this.notes = this.notes.sort((a, b) => a.id! - b.id!)
  }
}
