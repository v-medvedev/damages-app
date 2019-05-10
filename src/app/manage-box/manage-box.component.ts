import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatDialog } from '@angular/material';

import { DamageService } from '../damage.service';
import { Box } from '../shared/box.model';
import { Damage } from '../shared/damage.model';
import { ConfirmRemoveComponent } from '../confirm-remove/confirm-remove.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

export interface DialogData {
  box: Box;
}

export interface EditedProduct {
  stockNumber: string;
  itemPrice: number;
  reasonCode: string;
}

@Component({
  selector: 'app-manage-box',
  templateUrl: './manage-box.component.html',
  styleUrls: ['./manage-box.component.css']
})
export class ManageBoxComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['stockNumber', 'itemPrice', 'reasonCode'];
  dataSource? = new MatTableDataSource<Damage>();
  isItemSelected: boolean;
  selectedItem: Damage;

  constructor(public dialogRef: MatDialogRef<ManageBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private damageService: DamageService, public dialog: MatDialog) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.damageService.getDamageItems(this.data.box).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  closeDialog() {
    this.dialogRef.close(this.dataSource.data);
  }

  selectRow(data: Damage) {
    let selectionState: boolean;
    // update selection
    this.dataSource.data.forEach((element, i) => {
      if (element.id != data.id) {
        element.isSelected = false;
      } else {
        element.isSelected = !element.isSelected;
        selectionState = element.isSelected;
      }
    });
    // adjust buttons
    if (selectionState) {
      this.isItemSelected = true;
      this.selectedItem = data;
    } else {
      this.isItemSelected = false;
    }
  }

  addItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let item: Damage = result;
        item.boxId = this.data.box.id;
        item.isSelected = false;
        item.reasonCode = this.getReason(item.reasonCode);
        this.damageService.addDamageItem(item).subscribe(data => {
          const tableData = this.dataSource.data;
          tableData.push(data);
          this.dataSource.data = tableData;
          this.dataSource.sort = this.sort;
        });
      }
    });
  }

  editItem(): void {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '500px',
      data: {item: this.selectedItem}
    });
    dialogRef.afterClosed().subscribe((result: EditedProduct) => {
      if (result) {
        let item: Damage = Object.assign({}, this.selectedItem);
        item.stockNumber = result.stockNumber;
        item.itemPrice = result.itemPrice;
        item.reasonCode = this.getReason(result.reasonCode);
        item.isSelected = false;
        this.damageService.editDamageItem(item).subscribe(data => {
          const tableData = this.dataSource.data.map(item => {
            item.isSelected = false;
            if (item.id == data.id) {
              item = data;
            }
            return item;
          });
          this.dataSource.data = tableData;
          this.clearSelection();
        });
      }
    });
  }

  deleteItem(): void {
    const dialogRef = this.dialog.open(ConfirmRemoveComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.damageService.deleteDamageItem(this.selectedItem).subscribe(data => {
          const tableData = this.dataSource.data.filter(item => {
            item.isSelected = false;
            return item.id != this.selectedItem.id;
          });
          this.dataSource.data = tableData;
        });
      }
      this.isItemSelected = false;
      this.clearSelection();
    });
  }

  getReason(reasonCode: string) {
    if (reasonCode == '0') {
      return 'No Reason';
    } else if (reasonCode == '1') {
      return 'SCUFFED';
    } else if (reasonCode == '2') {
      return 'RIPPED';
    } else if (reasonCode == '3') {
      return 'MARKED';
    } else if (reasonCode == '4') {
      return 'STAINED';
    } else if (reasonCode == '5') {
      return 'PR RETURN MARKED';
    } else if (reasonCode == '6') {
      return 'BROKEN STRAP';
    } else if (reasonCode == '7') {
      return 'GLUE MARKS';
    } else if (reasonCode == '8') {
      return 'BROKEN ZIP';
    } else if (reasonCode == '9') {
      return 'BROKEN HEEL';
    } else if (reasonCode == '10') {
      return 'PR RETURN GLUE MARKS';
    } else if (reasonCode == '11') {
      return 'FAULTY SOLE';
    } else if (reasonCode == '12') {
      return 'TWO DIFFERENT SIZES';
    }
  }

  clearSelection(): void {
    this.dataSource.data.forEach((element, i) => {
      element.isSelected = false;
    });
  }

}
