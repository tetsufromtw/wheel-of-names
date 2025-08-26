import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brutal-wheel-renderer',
  templateUrl: './brutal-wheel-renderer.component.html',
  styleUrl: './brutal-wheel-renderer.component.scss',
  imports: []
})
export class BrutalWheelRendererComponent {
  @Input() sections: string[] = [];
  @Input() rotation = 0;
  @Input() highlightIndex = -1;

  protected getSectionPath(index: number): string {
    const centerX = 200;
    const centerY = 200;
    const radius = 190;
    const anglePerSection = (2 * Math.PI) / this.sections.length;
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
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFF00', '#FF8000', '#8000FF'];
    return colors[index % colors.length];
  }

  protected getSectionTextX(index: number): number {
    const centerX = 200;
    const radius = 120;
    const anglePerSection = (2 * Math.PI) / this.sections.length;
    const angle = (index + 0.5) * anglePerSection - Math.PI / 2;
    
    return centerX + radius * Math.cos(angle);
  }

  protected getSectionTextY(index: number): number {
    const centerY = 200;
    const radius = 120;
    const anglePerSection = (2 * Math.PI) / this.sections.length;
    const angle = (index + 0.5) * anglePerSection - Math.PI / 2;
    
    return centerY + radius * Math.sin(angle);
  }

  protected getSectionTextTransform(index: number): string {
    const anglePerSection = 360 / this.sections.length;
    const angle = (index + 0.5) * anglePerSection;
    const textX = this.getSectionTextX(index);
    const textY = this.getSectionTextY(index);
    
    return `rotate(${angle > 90 && angle < 270 ? angle + 180 : angle}, ${textX}, ${textY})`;
  }
}