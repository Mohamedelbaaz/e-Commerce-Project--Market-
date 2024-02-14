import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }
  getAllProducts(){
    return this.http.get(environment.apiURL + 'products')
  }
  getAllCategories(){
    return this.http.get(environment.apiURL + 'products/categories')
  }
  getProductByCat(keyword : string){
    return this.http.get(environment.apiURL + 'products/category/' + keyword)
  }
  getProductByid(id : any){
    return this.http.get(environment.apiURL + 'products/' + id)
  }
}
