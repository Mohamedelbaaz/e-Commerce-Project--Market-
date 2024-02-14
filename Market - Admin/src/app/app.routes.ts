import { Routes } from '@angular/router';
import { AllProductsComponent } from './products/Components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/Components/product-details/product-details.component';
import { CartsComponent } from './carts/Components/carts/carts.component';

export const routes: Routes = [
  {path:"products", component:AllProductsComponent},
  {path:"details/:id", component:ProductDetailsComponent},
  {path:"cart", component:CartsComponent},
  {path:"**", redirectTo:"cart", pathMatch:"full"}
];
