import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WheelComponent } from './components/wheel/wheel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WheelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'wheel-of-names';
}
