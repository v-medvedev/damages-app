import { Injectable } from "@angular/core";
import { Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs";

import { DamageService } from "./damage.service";
import { Box } from "./shared/box.model";

@Injectable({
    providedIn: 'root'
})
export class DamageResolver implements Resolve<Box[]> {

    constructor(private damageService: DamageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Box[]> {
        let supplier = '';
        if (state.url == '/indigo') {
          supplier = 'Indigo';
        } else if (state.url == '/hayley-baldwin') {
          supplier = 'Hayley Baldwin';
        } else if (state.url == '/hotsoles') {
          supplier = 'Hotsoles';
        } else if (state.url == '/leanne') {
          supplier = 'Leanne';
        } else if (state.url == '/moyee') {
          supplier = 'Moyee';
        } else if (state.url == '/stylish') {
          supplier = 'Stylish';
        } else if (state.url == '/koi') {
          supplier = 'Koi';
        } else if (state.url == '/kidderminster') {
          supplier = 'Kidderminster';
        } else if (state.url == '/livsey') {
          supplier = 'Livsey';
        } else if (state.url == '/city-shoes') {
          supplier = 'City Shoes';
        } else if (state.url == '/core-collection') {
          supplier = 'Core Collection';
        } else if (state.url == '/footwork') {
          supplier = 'Footwork';
        } else if (state.url == '/edge') {
          supplier = 'Edge';
        } else if (state.url == '/shoe-smart') {
          supplier = 'Shoe Smart';
        }
        return this.damageService.getDamageBoxes(supplier);
    }

}
