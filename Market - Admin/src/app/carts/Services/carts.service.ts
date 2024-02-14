import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  getAllCarts(param?: any) {
    let params = new HttpParams();
    if (param && param.start) {
      params = params.append("startDate", param.start);
    }
    if (param && param.end) {
      params = params.append("endDate", param.end);
    }

    // Construct the URL with the query parameters
    const url = environment.apiURL + 'carts';
    const options = { params: params };

    return this.http.get(url, options);
  }
  deleteCart(id : number){
    return this.http.delete(environment.apiURL+ 'cart/' + id)
  }
}
