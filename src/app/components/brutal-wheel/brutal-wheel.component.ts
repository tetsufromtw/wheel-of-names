import { Component, signal } from '@angular/core';
import { BrutalWheelRendererComponent } from '../brutal-wheel-renderer/brutal-wheel-renderer.component';
import { BrutalControlsComponent } from '../brutal-controls/brutal-controls.component';
import { BrutalModalComponent, type ModalType } from '../brutal-modal/brutal-modal.component';

@Component({
  selector: 'app-brutal-wheel',
  templateUrl: './brutal-wheel.component.html',
  styleUrl: './brutal-wheel.component.scss',
  imports: [BrutalWheelRendererComponent, BrutalControlsComponent, BrutalModalComponent]
})
export class BrutalWheelComponent {
  protected sections = signal<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
  protected isSpinning = signal<boolean>(false);
  protected rotation = signal<number>(0);
  protected highlightIndex = signal<number>(-1);
  protected showModal = signal<boolean>(false);
  protected modalType = signal<ModalType>('add');

  private readonly MIN_SECTIONS = 2;
  private readonly SPIN_DURATION = 10000;

  protected onGoClick(): void {
    if (this.isSpinning()) return;
    
    this.isSpinning.set(true);
    this.highlightIndex.set(-1);
    
    const currentRotation = this.rotation();
    const additionalSpins = Math.random() * 360 + 3600;
    const finalRotation = currentRotation + additionalSpins;
    this.rotation.set(finalRotation);
    
    setTimeout(() => {
      const sectionAngle = 360 / this.sections().length;
      const resultAngle = (360 - (finalRotation % 360)) % 360;
      const resultIndex = Math.floor(resultAngle / sectionAngle);
      
      this.highlightIndex.set(resultIndex);
      this.isSpinning.set(false);
    }, this.SPIN_DURATION);
  }

  protected onShowAddModal(): void {
    this.modalType.set('add');
    this.showModal.set(true);
  }

  protected onShowRemoveModal(): void {
    this.modalType.set('remove');
    this.showModal.set(true);
  }

  protected onModalConfirm(): void {
    if (this.modalType() === 'add') {
      this.addSection();
    } else {
      this.removeSection();
    }
    this.showModal.set(false);
  }

  protected onModalCancel(): void {
    this.showModal.set(false);
  }

  private addSection(): void {
    const currentSections = this.sections();
    const newSection = String.fromCharCode(65 + currentSections.length);
    this.sections.set([...currentSections, newSection]);
  }

  private removeSection(): void {
    const currentSections = this.sections();
    if (currentSections.length > this.MIN_SECTIONS) {
      this.sections.set(currentSections.slice(0, -1));
      this.highlightIndex.set(-1);
    }
  }
}