import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsModule } from '../products/products.module';
import { SharedRoutingModule } from './shared-routing.module';
import { StylesModule } from './styles/styles.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    ForgetPasswordComponent,
    HeaderComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    ProductsModule,
    StylesModule,
    ReactiveFormsModule
  ],
   providers : [{
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true
   }],
  exports:[HeaderComponent]
})
export class SharedModule { }
