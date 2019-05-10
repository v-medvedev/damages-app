import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

import { AppComponent } from '../app.component';
import { DamageService } from '../damage.service';
import { Box } from '../shared/box.model';
import { ConfirmRemoveComponent } from '../confirm-remove/confirm-remove.component';
import { ManageBoxComponent } from '../manage-box/manage-box.component';
import { Damage } from '../shared/damage.model';
import { CreateBoxComponent } from '../create-box/create-box.component';
import { WrongBoxComponent } from '../wrong-box/wrong-box.component';
import { ConfirmUnprocessComponent } from '../confirm-unprocess/confirm-unprocess.component';

export interface BoxInfo {
  boxId: number,
  dateCreated: Date,
  boxNotes: string,
  supplier: string,
  err: string
}

@Component({
  selector: 'app-supplier-boxes',
  templateUrl: './supplier-boxes.component.html',
  styleUrls: ['./supplier-boxes.component.css']
})
export class SupplierBoxesComponent implements OnInit {

  @Input() supplier: string;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['dateCreated', 'boxId', 'totalItems', 'totalPrice', 'boxNotes'];
  dataSource? = new MatTableDataSource<Box>();
  isBoxSelected: boolean;
  totalSupplierPrice: number = 0;
  selectedBox: Box;

  constructor(private appComponent: AppComponent, private damageService: DamageService, public dialog: MatDialog, private route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.supplier = data.supplier;
      this.dataSource.data = data['boxes'].map(item => {
        item.isSelected = false;
        this.totalSupplierPrice += item.totalPrice;
        return item;
      });
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  selectRow(data: Box) {
    let selectionState: boolean;
    // update selection
    this.dataSource.data.forEach((element, i) => {
      if (element.boxId != data.boxId) {
        element.isSelected = false;
      } else {
        element.isSelected = !element.isSelected;
        selectionState = element.isSelected;
      }
    });
    // adjust buttons
    if (selectionState) {
      this.isBoxSelected = true;
      this.selectedBox = data;
      console.log(this.selectedBox);
    } else {
      this.isBoxSelected = false;
      this.selectedBox = null;
    }
  }

  addBox(): void {
    const dialogRef = this.dialog.open(CreateBoxComponent, {
      width: '400px',
      data: { suplier: this.supplier }
    });
    dialogRef.afterClosed().subscribe((boxInfo: BoxInfo) => {
      if (boxInfo) {
        let box: Box = {
          boxId: boxInfo.boxId,
          dateCreated: boxInfo.dateCreated,
          boxNotes: boxInfo.boxNotes,
          supplier: this.supplier,
          totalItems: 0,
          totalPrice: 0,
          status: 0
        };
        this.damageService.createDamageBox(box).subscribe(data => {
          if (data.hasOwnProperty('err')) {
            const dialogRef = this.dialog.open(WrongBoxComponent, {
              width: '400px'
            });
          } else {
            let box: Box = data;
            const tableData = this.dataSource.data;
            tableData.push(box);
            this.dataSource.data = tableData;
            this.dataSource.sort = this.sort;
          }
        });
      }
      // recalculate supplier products
      this.clearSelection();
      this.isBoxSelected = false;
    });

  }

  manageBox(): void {
    const dialogRef = this.dialog.open(ManageBoxComponent, {
      width: '800px',
      data: { box: this.selectedBox }
    });
    dialogRef.afterClosed().subscribe((boxItems: Damage[]) => {
      // recalculate box products
      if (boxItems) {
        this.selectedBox.totalItems = boxItems.length;
        this.selectedBox.totalPrice = boxItems.reduce((totalPrice, item) => {
          totalPrice += item.itemPrice;
          return totalPrice;
        }, 0);
      }
      // recalculate supplier products
      this.clearSelection();
      this.isBoxSelected = false;
    });
  }

  deleteBox(): void {
    const dialogRef = this.dialog.open(ConfirmRemoveComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        const selectedBoxId = this.selectedBox.boxId;
        this.damageService.deleteDamageBox(this.selectedBox).subscribe(data => {
          const tableData = this.dataSource.data.filter(item => {
            item.isSelected = false;
            return item.boxId != selectedBoxId;
          });
          this.dataSource.data = tableData;
        });
      }
      this.isBoxSelected = false;
      this.clearSelection();
    });
  }

  exportBox(): void {
    this.damageService.getItems_BySupplier(this.supplier).subscribe(data => {
      var options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: false,
        showTitle: false,
        useBom: true,
        noDownload: false,
        headers: ["Box Id", "Date Created", "StockNumber", "Item Price", "Reason Code"],
        nullToEmptyString: true,
      };
      new Angular5Csv(data, this.supplier, options);
    });
  }

  processBox(): void {
    if (!this.selectedBox.status) {
      // Process Box
      this.damageService.processBox(this.selectedBox).subscribe(data => {
        this.selectedBox.status = parseInt(data.status);
        this.isBoxSelected = false;
        this.clearSelection();
      });
    } else {
      // UnProcess Box
      const dialogRef = this.dialog.open(ConfirmUnprocessComponent, {
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'yes') {
          this.damageService.processBox(this.selectedBox).subscribe(data => {
            this.selectedBox.status = parseInt(data.status);
            this.isBoxSelected = false;
            this.clearSelection();
          });
        }
      });
    }
  }

  clearSelection(): void {
    let totalPrice: number = 0;
    this.dataSource.data.forEach((element, i) => {
      element.isSelected = false;
      totalPrice += element.totalPrice;
    });
    if (this.totalSupplierPrice != totalPrice) {
      this.totalSupplierPrice = totalPrice;
    }
    this.selectedBox = null;
  }

  processButtonText(): string {
    if (!this.selectedBox) {
      return "Process Box";
    } else {
      if (this.selectedBox.status) {
        return "UnProcess Box";
      } else {
        return "Process Box";
      }
    }
  }

}
