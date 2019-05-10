import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

import { Damage } from '../shared/damage.model';

export interface IReasonCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  item: Damage;

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

  constructor(public dialogRef: MatDialogRef<EditItemComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    dialogRef.disableClose = true;
    this.item = Object.assign({}, data.item);
  }

  ngOnInit() {
    this.item.reasonCode = this.getReason(this.item.reasonCode);
  }

  getReason(reasonCode: string) {
    if (reasonCode == 'No Reason') {
      return '0';
    } else if (reasonCode == 'SCUFFED') {
      return '1';
    } else if (reasonCode == 'RIPPED') {
      return '2';
    } else if (reasonCode == 'MARKED') {
      return '3';
    } else if (reasonCode == 'STAINED') {
      return '4';
    } else if (reasonCode == 'PR RETURN MARKED') {
      return '5';
    } else if (reasonCode == 'BROKEN STRAP') {
      return '6';
    } else if (reasonCode == 'GLUE MARKS') {
      return '7';
    } else if (reasonCode == 'BROKEN ZIP') {
      return '8';
    } else if (reasonCode == 'BROKEN HEEL') {
      return '9';
    } else if (reasonCode == 'PR RETURN GLUE MARKS') {
      return '10';
    } else if (reasonCode == 'FAULTY SOLE') {
      return '11';
    } else if (reasonCode == 'TWO DIFFERENT SIZES') {
      return '12';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm) {
    this.dialogRef.close(f.form.value);
  }

}
