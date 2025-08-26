import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brutal-selector-renderer',
  templateUrl: './brutal-selector-renderer.component.html',
  styleUrl: './brutal-selector-renderer.component.scss',
  imports: []
})
export class BrutalSelectorRendererComponent {
  @Input() sections: string[] = [];
  @Input() currentIndex = 0;
  @Input() isSpinning = false;

  protected getSectionColor(index: number): string {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFF00', '#FF8000', '#8000FF'];
    return colors[index % colors.length];
  }
}