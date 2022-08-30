import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferDto } from 'src/app/models/DataTransferDto';
import { ActionMode } from 'src/app/models/enum';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  public products : Product[] = [];

  constructor(
    private productService: ProductService,
    private route: Router,
    ){}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
      this.productService.getProducts().subscribe(res=>{
        if(res.isError){
          console.log(res.errorMessage);
        }
        else{
          this.products = res.result;
        }
      })
  }

  AddNewProduct(){
    this.route.navigateByUrl('/product-form');
  }

  PreviewProduct(product: Product){
    if(product.id > 0){
      let dataTransferDTO: DataTransferDto = new DataTransferDto();
      dataTransferDTO.Id = product.id;
      dataTransferDTO.ActionMode = ActionMode.Preview;
      this.productService.setProductToService(dataTransferDTO);
      this.route.navigateByUrl('/product-form');
    }
  }

  EditProduct(product:Product){
    if(product.id>0){
      let dataTransferDTO: DataTransferDto = new DataTransferDto();
      dataTransferDTO.Id = product.id;
      dataTransferDTO.ActionMode = ActionMode.Edit;
      this.productService.setProductToService(dataTransferDTO);
      this.route.navigateByUrl('/product-form');
    }
  }

  DeleteProduct(product:Product){
     
  }
}
