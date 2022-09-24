import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteViewComponent } from './note-view/note-view.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: "", redirectTo: "/view/0", pathMatch: 'full' },
  { path: "view/:id", component: NoteViewComponent },
  { path: "settings", component: SettingsComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
