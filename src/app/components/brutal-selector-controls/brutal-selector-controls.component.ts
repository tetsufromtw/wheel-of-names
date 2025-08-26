import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-brutal-selector-controls',
  templateUrl: './brutal-selector-controls.component.html',
  styleUrl: './brutal-selector-controls.component.scss',
  imports: []
})
export class BrutalSelectorControlsComponent {
  @Input() isSpinning = false;
  @Input() sectionCount = 0;
  @Input() minSections = 2;
  
  @Output() goClick = new EventEmitter<void>();
  @Output() showAddModal = new EventEmitter<void>();
  @Output() showRemoveModal = new EventEmitter<void>();

  protected onGoClick(): void {
    if (!this.isSpinning) {
      this.goClick.emit();
    }
  }

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