import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MycartComponent } from './mycart/mycart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

const routes: Routes = [
  {path:'',component:MycartComponent},
  {path: 'shipping-form',component:ShippingFormComponent},
  {path: 'shipping-address',component:ShippingAddressComponent},
  {path: 'orders', component:OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCartRoutingModule { }
