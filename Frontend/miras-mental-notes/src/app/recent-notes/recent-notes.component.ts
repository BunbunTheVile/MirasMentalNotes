import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-recent-notes',
  templateUrl: './recent-notes.component.html',
  styleUrls: ['./recent-notes.component.css']
})
export class RecentNotesComponent implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllWithoutContent().subscribe(x => this.notes = x);
  }

}
