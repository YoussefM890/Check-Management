import {Component} from '@angular/core';
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'app';

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('fr');
  }
}
