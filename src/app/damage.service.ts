import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';

import { Box } from './shared/box.model';
import { Damage } from './shared/damage.model';

@Injectable({
  providedIn: 'root'
})
export class DamageService {

  private baseURL_Api_Endpoint = './api.php';
  // private baseURL_Api_Endpoint: string = 'http://localhost/damages/api.php';

  constructor(private http: HttpClient) { }

  getDamageBoxes(supplier: string): Observable<Box[]> {
    let params = {
      action: 'getDamageBoxes',
      supplier: supplier
    };
    return this.http.get<Box[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  createDamageBox(box: Box): Observable<Box> {
    let params = {
      action: 'createDamageBox',
      boxId: box.boxId.toString(),
      boxNotes: box.boxNotes,
      supplier: box.supplier,
      dateCreated: moment(box.dateCreated).format('YYYY-MM-DD')
    };
    return this.http.get<Box>(this.baseURL_Api_Endpoint, {params: params});
  }

  deleteDamageBox(box: Box): Observable<any> {
    let params = {
      action: 'deleteDamageBox',
      id: box.id.toString()
    };
    return this.http.get<any>(this.baseURL_Api_Endpoint, {params: params});
  }

  getDamageItems(box: Box): Observable<Damage[]> {
    let params = {
      action: 'getDamageItems',
      id: box.id.toString()
    };
    return this.http.get<Damage[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  addDamageItem(item: Damage): Observable<Damage> {
    let params = {
      action: 'addDamageItem',
      boxId: item.boxId.toString(),
      stockNumber: item.stockNumber,
      itemPrice: item.itemPrice.toString(),
      reasonCode: item.reasonCode
    };
    return this.http.get<Damage>(this.baseURL_Api_Endpoint, {params: params});
  }

  editDamageItem(item: Damage): Observable<Damage> {
    let params = {
      action: 'editDamageItem',
      id: item.id.toString(),
      boxId: item.boxId.toString(),
      stockNumber: item.stockNumber,
      itemPrice: item.itemPrice.toString(),
      reasonCode: item.reasonCode
    };
    return this.http.get<Damage>(this.baseURL_Api_Endpoint, {params: params});
  }

  deleteDamageItem(item: Damage): Observable<any> {
    let params = {
      action: 'deleteDamageItem',
      id: item.id.toString()
    };
    return this.http.get<any>(this.baseURL_Api_Endpoint, {params: params});
  }

  getItems_BySupplier(supplier: string): Observable<Damage[]> {
    let params = {
      action: 'getItems_BySupplier',
      supplier: supplier
    };
    return this.http.get<Damage[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  processBox(box: Box): Observable<any> {
    let params = {
      action: 'processBox',
      boxId: box.id.toString(),
      status: !box.status ? '1' : '0'
    };
    return this.http.get<any>(this.baseURL_Api_Endpoint, {params: params});
  }

}
