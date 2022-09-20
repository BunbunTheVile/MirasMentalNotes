import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../models/note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  note: Note = {};
  name = new FormControl<string>("");
  tags = new FormControl<string>("");
  content = new FormControl<string>("");

  noteHasChanged: boolean = false;

  constructor(private noteService: NoteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadNote(Number(params["id"]));
    });

    this.name.valueChanges.subscribe(() => this.checkIfNoteChanged());
    this.tags.valueChanges.subscribe(() => this.checkIfNoteChanged());
    this.content.valueChanges.subscribe(() => this.checkIfNoteChanged());
  }

  private checkIfNoteChanged(): void {
    if (this.nameChanged() || this.tagsChanged() || this.contentChanged()) {
      this.noteHasChanged = true;
      return;
    }
    
    this.noteHasChanged = false;
  }

  private nameChanged(): boolean {
    return !(this.note.name == this.name.getRawValue());
  } 

  private tagsChanged(): boolean {
    let noteTagString = this.tagsToString(this.note.tags ? this.note.tags : []);
    let formTagString = this.tags.getRawValue()!.toLowerCase();
    return !(noteTagString === formTagString);
  }

  private contentChanged(): boolean {
    return !(this.note.content == this.content.getRawValue());
  }

  private loadNote(id: number): void {
    if (id === 0) {
      this.note = { id: 0, name: "", content: "", tags: [] }
      this.setFormValuesFromNote();
    } else {
      this.noteService.get(id).subscribe(x => {
        this.note = x;
        this.setFormValuesFromNote();
      });
    }
  }

  private setFormValuesFromNote(): void {
    this.name.setValue(this.note.name ? this.note.name : "");
    
    this.tags.setValue(this.note.tags ? this.tagsToString(this.note.tags) : "");

    this.content.setValue(this.note.content ? this.note.content : "");
  }

  private setNoteValuesFromForm(): void {
    const nameValue = this.name.getRawValue();
    const tagsValue = this.tags.getRawValue();
    const contentValue = this.content.getRawValue();

    this.note.name = nameValue ? nameValue : "";
    this.note.tags = tagsValue ? this.stringToTags(tagsValue) : [];
    this.note.content = contentValue ? contentValue : "";
  }

  private tagsToString(tags: string[]): string {
    let tagString = "";
    tags.forEach(tag => tagString += `${tag.trim().toLowerCase()},`);
    tagString = tagString.slice(0, tagString.length - 1);
    return tagString;
  }

  private stringToTags(tagString: string): string[] {
    return tagString.trim().toLowerCase().split(",");
  }

  public save(): void {
    this.setNoteValuesFromForm();
    
    if (this.note.id === 0) {
      this.noteService.create(this.note).subscribe(x => {
        this.note = x;
        this.noteService.noteCreated.emit(this.note);
      });
    } else {
      this.noteService.update(this.note).subscribe(x => {
        this.note = x;
      });
    }

    this.checkIfNoteChanged();
  }
}
