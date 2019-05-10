import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatSelectModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatNativeDateModule, MatProgressSpinnerModule, MatSortModule, MatTabsModule, MatDialogModule, MatDatepickerModule, MatFormFieldModule, MatDividerModule, MAT_DATE_LOCALE } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { SupplierBoxesComponent } from './supplier-boxes/supplier-boxes.component';
import { ManageBoxComponent } from './manage-box/manage-box.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { CreateBoxComponent } from './create-box/create-box.component';
import { WrongBoxComponent } from './wrong-box/wrong-box.component';
import { ConfirmRemoveComponent } from './confirm-remove/confirm-remove.component';
import { ConfirmUnprocessComponent } from './confirm-unprocess/confirm-unprocess.component';

@NgModule({
  declarations: [
    AppComponent,
    SupplierBoxesComponent,
    ConfirmRemoveComponent,
    ConfirmUnprocessComponent,
    ManageBoxComponent,
    AddItemComponent,
    EditItemComponent,
    CreateBoxComponent,
    WrongBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTabsModule,
    MatDividerModule
  ],
  entryComponents: [
    ConfirmRemoveComponent,
    ConfirmUnprocessComponent,
    CreateBoxComponent,
    ManageBoxComponent,
    AddItemComponent,
    EditItemComponent,
    WrongBoxComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
