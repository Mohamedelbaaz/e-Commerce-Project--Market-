import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CartsService } from '../../Services/carts.service';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {
  cartProducts: any[] = [];
  total: any = 0;
  success : boolean = false;

  constructor(private service : CartsService){}
  ngOnInit(): void {
    this.getCartProducts();
    this.getCartTotal();
  }


  getCartProducts(){
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    console.log(this.cartProducts);
  }
  getCartTotal(){
    this.total = 0;
    for(let cartItem of this.cartProducts) {
      this.total += cartItem.item.price * cartItem.quantity;
    }
  }
  plusAmount(index : number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  minusAmount(index : number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    if(this.cartProducts[index].quantity <= "0"){
      this.cartProducts.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  detectChange(){
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  deleteProduct(index : number){
    this.cartProducts.splice(index, 1);
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  clearCart(){
    this.cartProducts.splice(0);
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  addCart(){
    let products = this.cartProducts.map(item => {
      return {productId:item.item.id, quantity:item.quantity}
    })
    let model = {
      userId:5,
      date:new Date(),
      products:products
    }
    this.service.createNewCart(model).subscribe(res => {
      this.success = true;
    })
    console.log(model);
  }
}
