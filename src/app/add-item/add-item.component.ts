import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

export interface IReasonCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {

  reasonCodes: IReasonCode[] = [
    { value: '1', viewValue: 'SCUFFED' },
    { value: '2', viewValue: 'RIPPED' },
    { value: '3', viewValue: 'MARKED' },
    { value: '4', viewValue: 'STAINED' },
    { value: '5', viewValue: 'PR RETURN MARKED' },
    { value: '6', viewValue: 'BROKEN STRAP' },
    { value: '7', viewValue: 'GLUE MARKS' },
    { value: '8', viewValue: 'BROKEN ZIP' },
    { value: '9', viewValue: 'BROKEN HEEL' },
    { value: '10', viewValue: 'PR RETURN GLUE MARKS' },
    { value: '11', viewValue: 'FAULTY SOLE' },
    { value: '12', viewValue: 'TWO DIFFERENT SIZES' },
    { value: '0', viewValue: 'No reason' }
  ];

  item = {
    stockNumber: '',
    itemPrice: 0,
    reasonCode: '0'
  };

  constructor(public dialogRef: MatDialogRef<AddItemComponent>) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm) {
    this.dialogRef.close(f.form.value);
  }

}
