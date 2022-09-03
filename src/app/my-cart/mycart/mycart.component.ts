import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit{

  cartItems: CartItem[];
  totalAmount:number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    this.cartService.getCartItems().subscribe((res)=>{
      if(res.isError)
      {
        console.log(res.errorMessage);
      }
      else{
        this.cartItems = res.result.items;
        this.totalAmount = res.result.totalAmount;
      }
    })
  }

  removeFromCart(item:CartItem){
    this.cartService.removeFromCart(item).subscribe((res)=>{
      if(res.isError)
      {
        console.log(res.errorMessage);
      }
      else{
        console.log(res.result);
        this.getCartItems();
      }
    });
  }

  addMoreInCart(item:CartItem){
    this.cartService.addMoreInCart(item).subscribe((res)=>{
      if(res.isError)
      {
        console.log(res.errorMessage);
      }
      else{
        console.log(res.result);
        this.getCartItems();
      }
    });
    
  }

  orderAll(items: CartItem[]){
      items.forEach(item => {
        this.order(item);
      });
      this.getCartItems();
  }

  order(item: CartItem){
    this.cartService.saveShippinItem(item).subscribe(res=>{
      if(res.isError){
        console.log(res.errorMessage);
      }
      else{
        console.log(res.result);
        this.getCartItems();
      }
    })
  }
}
