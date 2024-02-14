import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { SpinnerComponent } from '../../../shared/Components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  id : any;
  data : any = {};
  loading : boolean = false;

  constructor(private route : ActivatedRoute, private prdService : ProductsService){
    this.id = this.route.snapshot.paramMap.get("id")
  }
  ngOnInit(): void {
    this.getPrdByID();
  }

  getPrdByID(){
    this.loading = true;
    this.prdService.getProductByid(this.id).subscribe(res => {
      this.data = res;
      this.loading = false;
    } ,error => {
      this.loading = false;
      alert(error);
    })
  }
}
