import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [

  {path:'',pathMatch: 'full', redirectTo:'products'},
  {path:'products', component:ProductComponent},
  {path:'forget-password', component:ForgetPasswordComponent},
  {path:'auth', loadChildren:() => import('../authentication/authentication.module').then(m =>m.AuthenticationModule)},
  {path: 'admin-products', loadChildren:() => import('../products/products.module').then( m => m.ProductsModule)},
  {path:'cart',loadChildren:() => import('../my-cart/my-cart.module').then(m => m.MyCartModule)
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
