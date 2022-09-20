import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.css']
})
export class OptionsMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public newNote(): void {
    this.router.navigate(["view", 0]);
  }
}
