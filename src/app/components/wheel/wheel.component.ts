import { Component, signal } from '@angular/core';
import { WheelRendererComponent } from '../wheel-renderer/wheel-renderer.component';
import { WheelControlsComponent } from '../wheel-controls/wheel-controls.component';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.scss',
  imports: [WheelRendererComponent, WheelControlsComponent]
})
export class WheelComponent {
  protected sections = signal<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
  protected isSpinning = signal<boolean>(false);
  protected rotation = signal<number>(0);
  protected highlightIndex = signal<number>(-1);

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

  protected onAddSection(): void {
    if (this.isSpinning()) return;
    
    const currentSections = this.sections();
    const newSection = String.fromCharCode(65 + currentSections.length);
    this.sections.set([...currentSections, newSection]);
  }

  protected onRemoveSection(): void {
    if (this.isSpinning()) return;
    
    const currentSections = this.sections();
    if (currentSections.length > this.MIN_SECTIONS) {
      this.sections.set(currentSections.slice(0, -1));
      this.highlightIndex.set(-1);
    }
  }

  private getSectionAngle(): number {
    return 360 / this.sections().length;
  }
}