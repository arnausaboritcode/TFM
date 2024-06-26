import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  isLoading = true;
  //Show global spinner first time user enter to page
  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
