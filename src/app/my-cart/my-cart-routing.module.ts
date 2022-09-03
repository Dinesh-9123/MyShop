import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { MycartComponent } from './mycart/mycart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

const routes: Routes = [
  {path:'',component:MycartComponent, canActivate:[AuthGuardService]},
  {path: 'shipping-form',component:ShippingFormComponent, canActivate:[AuthGuardService]},
  {path: 'shipping-address',component:ShippingAddressComponent, canActivate:[AuthGuardService]},
  {path: 'orders', component:OrderDetailsComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCartRoutingModule { }
