import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { SpinnerComponent } from '../../../shared/Components/spinner/spinner.component';
import { SelectComponent } from '../../../shared/Components/select/select.component';
import { SharedProductComponent } from '../../../shared/Components/shared-product/shared-product.component';
import { RouterLink } from '@angular/router';
import { product } from '../../models/product';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [SharedModule, CommonModule, SpinnerComponent, SelectComponent, SharedProductComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit, AfterViewInit {
  productList : product[] = [];
  categoriesList : string[] = [];
  loader : boolean = false;
  cartProducts : any[] = [];
  baseApi: any = '';
  form! : FormGroup;

  @ViewChild('viewCartModal') viewCartModal: any;

  constructor(private prdService : ProductsService, private build : FormBuilder){
    this.form = build.group({
      title : ['', [Validators.required]],
      price : ['', [Validators.required]],
      description : ['', [Validators.required]],
      image : ['', [Validators.required]],
      category : ['', [Validators.required]]
    })
  }
  ngAfterViewInit(): void {
    console.log(this.viewCartModal);
  }
  ngOnInit(): void {
    this.form;
    this.getProducts();
    this.getCategories();
  }
  openModal(): void {
    if (this.viewCartModal) {
      // Ensure that this.viewCartModal.nativeElement exists before accessing its properties or methods
      this.viewCartModal.nativeElement.show();
    }
  }
  closeModal(): void {
    this.viewCartModal.nativeElement.hide(); // This line triggers the modal to hide
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
  getSelctedCategory(event:any){
    this.form.get('ctegory')?.setValue(event.target.value);
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
  getImagePath(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.baseApi = reader.result;
      this.form.get('image')?.setValue(this.baseApi)
    }
  }
  addProduct(){
    const modal = this.form.value;
    this.prdService.createProduct(modal).subscribe((res) => {
      alert('Creation Completed')
    })
  }
  update(item:any){
    // this.form.get('title')?.setValue(item.title)
    // this.form.get('description')?.setValue(item.description)
    // this.form.get('category')?.setValue(item.category)
    // this.form.get('price')?.setValue(item.price)
    // this.form.get('image')?.setValue(item.image)
    this.form.patchValue({
      title : item.title,
      description : item.description,
      category : item.category,
      price : item.price,
      image : item.image
    })
    this.baseApi = item.image;
  }
}
