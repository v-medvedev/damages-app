import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierBoxesComponent } from './supplier-boxes/supplier-boxes.component';
import { DamageResolver } from './damage.resolver';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'indigo' },
  { path: 'indigo', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Indigo' } },
  { path: 'hayley-baldwin', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Hayley Baldwin' } },
  { path: 'hotsoles', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Hotsoles' } },
  { path: 'leanne', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Leanne' } },
  { path: 'moyee', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Moyee' } },
  { path: 'stylish', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Stylish' } },
  { path: 'koi', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Koi' } },
  { path: 'kidderminster', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Kidderminster' } },
  { path: 'livsey', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Livsey' } },
  { path: 'city-shoes', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'City Shoes' } },
  { path: 'core-collection', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Core Collection' } },
  { path: 'footwork', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Footwork' } },
  { path: 'edge', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Edge' } },
  { path: 'shoe-smart', component: SupplierBoxesComponent, resolve: { boxes: DamageResolver }, data: { supplier: 'Shoe Smart' } },
  { path: '**', redirectTo: 'indigo' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
