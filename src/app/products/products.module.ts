import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';


@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[]
})
export class ProductsModule { }
