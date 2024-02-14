import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { product } from '../../../products/models/product';

@Component({
  selector: 'app-shared-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shared-product.component.html',
  styleUrl: './shared-product.component.css'
})
export class SharedProductComponent {
  @Input() data! : product ;
  @Output() cartItem = new EventEmitter();
  addButton : boolean = false;
  amount : number = 0;

  constructor(){}

  add(){
    this.cartItem.emit({item : this.data, quantity : this.amount})
  }

}
