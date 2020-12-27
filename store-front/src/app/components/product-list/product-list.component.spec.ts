import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {HttpClient} from '@angular/common/http';

import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public filterQuery = "";
  public rowsOnPage = 5;

  private selectedProduct: Product;
  private productList: Product[];

  constructor(
    private productService:ProductService,
    private router:Router,
    private http:HttpClient,
    private route:ActivatedRoute
  ) { }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigate(['/productDetail', this.selectedProduct.id]);
  }





  ngOnInit() {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    this.route.queryParams.subscribe(params => {
      if(params['productList']) {
        console.log("filtered product list");
        this.productList = JSON.parse(params['productList']);
      } else {
        this.productService.getProductList().subscribe(
          response => {
            this.productList = JSON.parse(response);
          },
          error => {
            console.log(error.error);
          }
        );
      }
    });
  }


}


