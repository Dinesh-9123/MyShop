import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  Products:Product[];

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(){ 
    this.productService.getProducts().subscribe((res)=>{
            if(res.isError)
            {
              console.log(res.errorMessage);
            }
            else{
              this.Products = res.result;
            }
    })
  }
  
  addToCart(item:Product){
      this.productService.addToCart(item).subscribe((res)=>{
        if(res.isError)
        {
          console.log(res.errorMessage);
        }
        else{
          console.log(res.result);
        }
      });
    }
}
