import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from '../guards/admin-guard.service';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  {path:'',component:AdminProductsComponent,canActivate:[AdminGuardService]},
  {path:'product-form', component:ProductFormComponent,canActivate:[AdminGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
