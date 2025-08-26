import { Component, signal } from '@angular/core';
import { BrutalSelectorRendererComponent } from '../brutal-selector-renderer/brutal-selector-renderer.component';
import { BrutalSelectorControlsComponent } from '../brutal-selector-controls/brutal-selector-controls.component';
import { BrutalModalComponent, type ModalType } from '../brutal-modal/brutal-modal.component';

@Component({
  selector: 'app-brutal-selector',
  templateUrl: './brutal-selector.component.html',
  styleUrl: './brutal-selector.component.scss',
  imports: [BrutalSelectorRendererComponent, BrutalSelectorControlsComponent, BrutalModalComponent]
})
export class BrutalSelectorComponent {
  protected sections = signal<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
  protected isSpinning = signal<boolean>(false);
  protected currentIndex = signal<number>(0);
  protected showModal = signal<boolean>(false);
  protected modalType = signal<ModalType>('add');

  private readonly MIN_SECTIONS = 2;
  private readonly SPIN_DURATION = 10000;
  private animationInterval?: number;

  protected onGoClick(): void {
    if (this.isSpinning()) return;
    
    this.isSpinning.set(true);
    let elapsedTime = 0;
    let speed = 50; // 初期速度 (ms)
    
    this.animationInterval = window.setInterval(() => {
      this.currentIndex.set((this.currentIndex() + 1) % this.sections().length);
      elapsedTime += speed;
      
      // 後半逐漸減速
      if (elapsedTime > this.SPIN_DURATION / 2) {
        speed = Math.min(speed + 5, 300);
      }
      
      if (elapsedTime >= this.SPIN_DURATION) {
        clearInterval(this.animationInterval);
        this.isSpinning.set(false);
      }
    }, speed);
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
      if (this.currentIndex() >= currentSections.length - 1) {
        this.currentIndex.set(0);
      }
    }
  }
}