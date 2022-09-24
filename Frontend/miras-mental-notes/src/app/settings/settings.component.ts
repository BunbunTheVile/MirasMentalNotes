import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  public callExport(): void {
    this.noteService.export().subscribe();
  }
}
