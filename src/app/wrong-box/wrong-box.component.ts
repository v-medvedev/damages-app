import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-wrong-box',
  templateUrl: './wrong-box.component.html',
  styleUrls: ['./wrong-box.component.css']
})
export class WrongBoxComponent {

  constructor(public dialogRef: MatDialogRef<WrongBoxComponent>) {
    dialogRef.disableClose = true;
  }

  onOkClick() {
    this.dialogRef.close();
  }

}
