import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartsService } from '../../Services/carts.service';
import { ProductsService } from '../../../products/Services/products.service';


@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {
  carts: any[] = [];
  form! : FormGroup;

  products : any[] = [];
  detials : any;

  constructor(private service : CartsService, private build : FormBuilder, private prdService : ProductsService){
    this . form = build.group({
      start : [''],
      end : ['']
    })
  }

  ngOnInit(): void {
    this.form;
    this.getAllCarts();
  }

  getAllCarts(){
    this.service.getAllCarts().subscribe((res:any) => {
      this.carts = res;
    })
  }
  applyItem(){
    let date = this.form.value;
    this.service.getAllCarts().subscribe((res:any) => {
      this.carts = res;
    })
    console.log(this.form.value);
  }
  deleteCart(id : number){
    this.service.deleteCart(id).subscribe(res => {
      this.getAllCarts();
      alert('Cart Deleted Successfully')
    })
  }
  view(index:number){
    this.products = []
    this.detials = this.carts[index];
    for(let x in this.detials.products){
      this.prdService.getProductByid(this.detials.products[x].productId).subscribe(res => {
        this.products.push({item:res, quantity:this.detials.products[x].quantity})
      })
    }
    console.log(this.detials);
  }
}
