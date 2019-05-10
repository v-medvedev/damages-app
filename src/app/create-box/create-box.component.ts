import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-box',
  templateUrl: './create-box.component.html',
  styleUrls: ['./create-box.component.css']
})
export class CreateBoxComponent {

  box = {
    boxId: '',
    dateCreated: new Date(),
    boxNotes: ''
  };

  constructor(public dialogRef: MatDialogRef<CreateBoxComponent>) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm) {
    this.dialogRef.close(f.form.value);
  }

}
