import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-unprocess',
  templateUrl: './confirm-unprocess.component.html',
  styleUrls: ['./confirm-unprocess.component.css']
})
export class ConfirmUnprocessComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmUnprocessComponent>) {
    dialogRef.disableClose = true;
  }

  onYesClick(): void {
    this.dialogRef.close('yes');
  }

  onNoClick(): void {
    this.dialogRef.close('no');
  }
}
