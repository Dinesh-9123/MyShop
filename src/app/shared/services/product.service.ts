import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { adminServiceUrls } from '../../config/admin';
import { productsServiceUrls } from '../../config/product';
import { DataTransferDto } from '../../models/DataTransferDto';
import { ActionMode } from '../../models/enum';
import { Product } from '../../models/product.model';
import { Response } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataTransferDto : DataTransferDto = {
    Id:0,
    ActionMode: ActionMode.Add
  }

  constructor(private http: HttpClient) { }

  saveProduct(product : Product): Observable<any>{
    return  this.http.post<Response<string>>(adminServiceUrls.addProduct(),product);
  }

  getProducts() : Observable<any>
  {
    return this.http.get<Response<Product[]>>(productsServiceUrls.products());
  }

  getById(id:number): Observable<any>{
    return this.http.get<Response<Product>>(adminServiceUrls.getById(id));
  }

  addToCart(item:Product) :Observable<any>{
      return  this.http.post<Response<string>>(productsServiceUrls.addToCart(),item);
  }
  setProductToService(details: DataTransferDto){
      this.dataTransferDto = details;
  }
  getProductDataFromService(): DataTransferDto{
      return this.dataTransferDto;
  }
  resetProductDataToService(): void{
    this.dataTransferDto = {
      Id:0,
      ActionMode: ActionMode.Add
    }
  }

}
