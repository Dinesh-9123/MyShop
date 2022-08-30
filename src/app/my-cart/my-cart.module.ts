import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MyCartRoutingModule } from './my-cart-routing.module';
import { MycartComponent } from './mycart/mycart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';


@NgModule({
  declarations: [
    MycartComponent,
    OrderDetailsComponent,
    ShippingAddressComponent,
    ShippingFormComponent
  ],
  imports: [
    CommonModule,
    MyCartRoutingModule,
    ReactiveFormsModule
  ]
})
export class MyCartModule { }
