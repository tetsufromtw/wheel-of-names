import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.scss',
  imports: []
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

  protected getSectionAngle(): number {
    return 360 / this.sections().length;
  }

  protected getSectionPath(index: number): string {
    const centerX = 200;
    const centerY = 200;
    const radius = 192;
    const anglePerSection = (2 * Math.PI) / this.sections().length;
    const startAngle = index * anglePerSection - Math.PI / 2;
    const endAngle = (index + 1) * anglePerSection - Math.PI / 2;
    
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = anglePerSection > Math.PI ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  }

  protected getSectionColor(index: number): string {
    return index % 2 === 0 ? '#ff6b6b' : '#4ecdc4';
  }

  protected getSectionTextX(index: number): number {
    const centerX = 200;
    const radius = 120;
    const anglePerSection = (2 * Math.PI) / this.sections().length;
    const angle = (index + 0.5) * anglePerSection - Math.PI / 2;
    
    return centerX + radius * Math.cos(angle);
  }

  protected getSectionTextY(index: number): number {
    const centerY = 200;
    const radius = 120;
    const anglePerSection = (2 * Math.PI) / this.sections().length;
    const angle = (index + 0.5) * anglePerSection - Math.PI / 2;
    
    return centerY + radius * Math.sin(angle);
  }

  protected getSectionTextTransform(index: number): string {
    const anglePerSection = 360 / this.sections().length;
    const angle = (index + 0.5) * anglePerSection;
    const textX = this.getSectionTextX(index);
    const textY = this.getSectionTextY(index);
    
    return `rotate(${angle > 90 && angle < 270 ? angle + 180 : angle}, ${textX}, ${textY})`;
  }
}