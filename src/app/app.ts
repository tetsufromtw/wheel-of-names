import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrutalSelectorComponent } from './components/brutal-selector/brutal-selector.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BrutalSelectorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'wheel-of-names';
}
