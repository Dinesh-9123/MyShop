import { Component, OnInit } from '@angular/core';
import { ShippingItem } from 'src/app/models/shipping.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {

  shippingItems: ShippingItem[];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getShippingItems();
  }

  getShippingItems(){
    this.cartService.getShippingDataItems().subscribe(res=>{
      if(res.isError){
        console.log(res.errorMessage);
      }
      else{
        this.shippingItems  = res.result;
      }
    })
  }

}
