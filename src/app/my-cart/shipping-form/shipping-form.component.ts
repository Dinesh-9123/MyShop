import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionMode } from 'src/app/models/enum';
import { DataTransferDto } from 'src/app/models/DataTransferDto';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  public shippingform : FormGroup;
  public actionMode : ActionMode = ActionMode.Add;
  public dataTransferDTO : DataTransferDto = {ActionMode : this.actionMode, Id: 0};
  public submitted : boolean = false;
  public shippingData:User;


  constructor(
    private formBuilder:FormBuilder,
    private route: Router,
    private cartService : CartService
    ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.ReceiveTransmittedData();
  }

  InitializeForm(){
      this.shippingform = this.formBuilder.group({
        id:[this.dataTransferDTO.Id],
        country: ['',Validators.required],
        district:['',Validators.required],
        pinCode: [null,Validators.required],
        state: ['',Validators.required],
        city: ['',Validators.required],
        houseNo: ['',Validators.required]
      })
  }

  get f(){
    return this.shippingform.controls;
  }

  Save(){
    this.submitted = true;
    if(this.shippingform.invalid){
      this.shippingform.markAsTouched();
      return;
    }
    else{
      var self = this;
      self.cartService.saveShippingData(this.shippingform.value).subscribe(res=>{
         if(res.isError){
           console.log(res.errorMessage);
         }
         else{
           this.Reset();
           this.route.navigateByUrl('')
         }
       })
    }
  }

  Reset(){
    this.submitted = false;
    this.shippingform.reset();
    this.InitializeForm();
  }


  EditProduct(id:number){
     this.cartService.getById(id).subscribe((res)=>{
       if(res.isError){
         console.log(res.errorMessage);
       }
       else{
         this.shippingData = res.result;
         var self = this;
        self.shippingform.patchValue({
         id: self.shippingData.id,
         country: self.shippingData.country,
         district: self.shippingData.district,
         pinCode: self.shippingData.pinCode,
         state: self.shippingData.state,
         city: self.shippingData.city,
         houseNo: self.shippingData.houseNo
       })
     this.actionMode = ActionMode.Edit;
       }
     })
  }

  PreviewRecord(id:number){
     this.cartService.getById(id).subscribe(res=>{
       if(res.isError){
         console.log(res.errorMessage);
       }
       else{
         this.shippingData = res.result;
         var self = this;
       self.shippingform.patchValue({
        id: self.shippingData.id,
        country: self.shippingData.country,
        district: self.shippingData.district,
        pinCode: self.shippingData.pinCode,
        state: self.shippingData.state,
        city: self.shippingData.city,
        houseNo: self.shippingData.houseNo
       })
     this.shippingform.disable();
     self.actionMode = ActionMode.Preview;
       }
     })
    
  }

  ReceiveTransmittedData(){
       this.dataTransferDTO = this.cartService.getShippingDataFromService();
       if(this.dataTransferDTO){
         this.cartService.resetShippingDataToService();
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
