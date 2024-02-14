import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { SpinnerComponent } from '../../../shared/Components/spinner/spinner.component';
import { SelectComponent } from '../../../shared/Components/select/select.component';
import { SharedProductComponent } from '../../../shared/Components/shared-product/shared-product.component';
import { RouterLink } from '@angular/router';
import { product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [SharedModule, CommonModule, SpinnerComponent, SelectComponent, SharedProductComponent, RouterLink],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  productList : product[] = [];
  categoriesList : string[] = [];
  loader : boolean = false;
  cartProducts : any[] = [];

  constructor(private prdService : ProductsService){}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.loader = true;
    this.prdService.getAllProducts().subscribe((res:any) => {
      console.log(res);
      this.productList = res;
      this.loader = false;
    }, error => {
      alert(error);
      this.loader = false;
    })
  }
  getCategories(){
    this.loader = true;
    this.prdService.getAllCategories().subscribe((res:any) => {
      console.log(res);
      this.categoriesList = res;
      this.loader = false;
    }, error => {
      alert(error);
      this.loader = false;
    })
  }
  filterCategories(event : any){
    let value = event.target.value;
    // console.log(value);
    if(value == "all"){
      return this.getProducts();
    } else {
      this.getProductsCat(value);
    }
  }
  getProductsCat(keyword:string){
    this.loader = true;
    this.prdService.getProductByCat(keyword).subscribe((res:any) => {
      this.productList = res
      this.loader = false;
    })
  }
  addToCart(event : any){
    console.log(event);
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id);
      if(exist) {
        alert("Product is already added to your cart")
      } else {
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }
}
