import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { RecentNotesComponent } from './recent-notes/recent-notes.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { AppRoutingModule } from './app-routing.module';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    RecentNotesComponent,
    NoteViewComponent,
    OptionsMenuComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
