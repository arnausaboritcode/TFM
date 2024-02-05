import { Component } from '@angular/core';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
