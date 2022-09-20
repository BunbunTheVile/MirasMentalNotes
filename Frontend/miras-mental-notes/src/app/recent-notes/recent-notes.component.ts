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

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.noteService.getAllWithoutContent().subscribe(x => this.notes = x);
    this.noteService.noteCreated.subscribe(x => {
      this.notes.push(x);
      this.selectNote(x.id!);
    });
  }

  public selectNote(id: number): void {
    this.router.navigate(["view", id]);
  }
}
