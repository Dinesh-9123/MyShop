import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { cartServiceUrls } from '../../config/cart';
import { CartData } from '../../models/cart-data.model';
import { CartItem } from '../../models/cart-item.model';
import { Response } from '../../models/response.model';
import { DataTransferDto } from '../../models/DataTransferDto';
import { ActionMode } from '../../models/enum';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  cartItems:CartData[] = [];
  dataTransferDto : DataTransferDto = {
    Id:0,
    ActionMode: ActionMode.Add
  }

  getCartItems() : Observable <any>{
   return this.http.get<Response<CartData[]>>(cartServiceUrls.getCartItems(),{
    headers : new HttpHeaders({
      
    })
   });
  }

  saveShippingData(data:User): Observable<any>{
    return this.http.post('',data)
  }

  getById(id:number): Observable<any>{
    return this.http.get<Response<User>>('');
  }

  removeFromCart(item:CartItem): Observable<any>{
     return  this.http.post<Response<string>>(cartServiceUrls.removeFromCart(),item)}

  addMoreInCart(item: CartItem) : Observable<any>{
    return  this.http.post<Response<string>>(cartServiceUrls.addMoreInCart(),item);
  }

  orderAll(items:CartItem[]){
    this.http.post<Response<string>>(cartServiceUrls.orderAll(),items).subscribe((res)=>{
      if(res.isError)
      {
        console.log(res.errorMessage);
      }
      else{
        console.log(res.result);
      }
    })
  }

  setShippingDataToService(details: DataTransferDto){
    this.dataTransferDto = details;
  }
  getShippingDataFromService(): DataTransferDto{
    return this.dataTransferDto;
  }
  resetShippingDataToService(): void{
    this.dataTransferDto = {
      Id:0,
      ActionMode: ActionMode.Add
    }
  }

}
