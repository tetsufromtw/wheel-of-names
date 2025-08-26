import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-wheel-controls',
  templateUrl: './wheel-controls.component.html',
  styleUrl: './wheel-controls.component.scss',
  imports: []
})
export class WheelControlsComponent {
  @Input() isSpinning = false;
  @Input() sectionCount = 0;
  @Input() minSections = 2;
  
  @Output() addSection = new EventEmitter<void>();
  @Output() removeSection = new EventEmitter<void>();

  protected onAddSection(): void {
    if (!this.isSpinning) {
      this.addSection.emit();
    }
  }

  protected onRemoveSection(): void {
    if (!this.isSpinning && this.sectionCount > this.minSections) {
      this.removeSection.emit();
    }
  }
}