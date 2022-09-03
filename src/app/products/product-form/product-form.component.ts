import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionMode } from 'src/app/models/enum';
import { Product } from 'src/app/models/product.model';
import { DataTransferDto } from 'src/app/models/DataTransferDto';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public productForm : FormGroup;
  public productData: Product;
  public actionMode : ActionMode = ActionMode.Add;
  public dataTransferDTO : DataTransferDto = {ActionMode : this.actionMode, Id: 0};
  public submitted : boolean = false;


  constructor(
    private formBuilder:FormBuilder,
    private productService: ProductService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.ReceiveTransmittedData();
  }

  InitializeForm(){
      this.productForm = this.formBuilder.group({
        id:[this.dataTransferDTO.Id],
        name: ['',Validators.required],
        imgUrl:['',Validators.required],
        price: ['',Validators.required],
        description: ['',Validators.required]
      })
  }

  get f(){
    return this.productForm.controls;
  }

  Save(){
    this.submitted = true;
    if(this.productForm.invalid){
      this.productForm.markAsTouched();
      return;
    }
    else{
      var self = this;
      this.productService.saveProduct(this.productForm.value).subscribe(res=>{
        if(res.isError){
          console.log(res.errorMessage);
        }
        else{
          this.Reset();
          this.route.navigateByUrl('/admin-products')
        }
      })
    }
  }

  Reset(){
    this.submitted = false;
    this.productForm.reset();
    this.InitializeForm();
  }


  EditProduct(id:number){
    this.productService.getById(id).subscribe((res)=>{
      if(res.isError){
        console.log(res.errorMessage);
      }
      else{
        this.productData = res.result;
        var self = this;
      self.productForm.patchValue({
        id: self.productData.id,
        name: self.productData.name,
        description: self.productData.description,
        price: self.productData.price,
        imgUrl: self.productData.imgUrl
      })
    this.actionMode = ActionMode.Edit;
      }
    })
  }

  PreviewRecord(id:number){
    this.productService.getById(id).subscribe(res=>{
      if(res.isError){
        console.log(res.errorMessage);
      }
      else{
        this.productData = res.result;
        var self = this;
      self.productForm.patchValue({
        id: self.productData.id,
        name: self.productData.name,
        description: self.productData.description,
        price: self.productData.price,
        imgUrl: self.productData.imgUrl
      })
    this.productForm.disable();
    self.actionMode = ActionMode.Preview;
      }
    })
    
  }

  ReceiveTransmittedData(){
      this.dataTransferDTO = this.productService.getProductDataFromService();
      if(this.dataTransferDTO){
        this.productService.resetProductDataToService();
        switch (this.dataTransferDTO.ActionMode){
          case ActionMode.Edit:
            this.EditProduct(this.dataTransferDTO.Id);
            break;
          case ActionMode.Preview:
            this.PreviewRecord(this.dataTransferDTO.Id);
            break;
          default:
            break;    
        }
      }
  }

}
