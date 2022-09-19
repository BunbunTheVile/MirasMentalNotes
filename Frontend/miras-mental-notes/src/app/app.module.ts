import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecentNotesComponent } from './recent-notes/recent-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    RecentNotesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
