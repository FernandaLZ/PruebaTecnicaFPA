import { Component, inject } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmDialogData } from '../../interfaces/shared-interfaces';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogContent, MatDialogActions, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA) as ConfirmDialogData;
}
