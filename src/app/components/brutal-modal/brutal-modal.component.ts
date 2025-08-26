import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ModalType = 'add' | 'remove';

@Component({
  selector: 'app-brutal-modal',
  templateUrl: './brutal-modal.component.html',
  styleUrl: './brutal-modal.component.scss',
  imports: []
})
export class BrutalModalComponent {
  @Input() isOpen = false;
  @Input() type: ModalType = 'add';
  @Input() currentSectionCount = 0;
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  protected onOverlayClick(): void {
    this.cancel.emit();
  }

  protected onConfirm(): void {
    this.confirm.emit();
  }

  protected onCancel(): void {
    this.cancel.emit();
  }

  protected getTitle(): string {
    return this.type === 'add' ? 'メンバーを追加' : 'メンバーを削除';
  }

  protected getMessage(): string {
    if (this.type === 'add') {
      return `現在 ${this.currentSectionCount} 個のメンバーがあります。新しいメンバーを追加しますか？`;
    } else {
      return `現在 ${this.currentSectionCount} 個のメンバーがあります。最後のメンバーを削除しますか？`;
    }
  }
}