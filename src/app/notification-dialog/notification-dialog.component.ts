import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.css'
})
export class NotificationDialogComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  closePopup(): void {
    this.close.emit();
  }
}
