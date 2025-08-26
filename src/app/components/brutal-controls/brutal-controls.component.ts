import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-brutal-controls',
  templateUrl: './brutal-controls.component.html',
  styleUrl: './brutal-controls.component.scss',
  imports: []
})
export class BrutalControlsComponent {
  @Input() isSpinning = false;
  @Input() sectionCount = 0;
  @Input() minSections = 2;
  
  @Output() showAddModal = new EventEmitter<void>();
  @Output() showRemoveModal = new EventEmitter<void>();

  protected onAddSection(): void {
    if (!this.isSpinning) {
      this.showAddModal.emit();
    }
  }

  protected onRemoveSection(): void {
    if (!this.isSpinning && this.sectionCount > this.minSections) {
      this.showRemoveModal.emit();
    }
  }
}