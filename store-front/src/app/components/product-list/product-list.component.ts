import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Product } from '../../models/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

//https://www.itsolutionstuff.com/post/angular-9-8-datatable-example-with-pagination-sorting-filteringexample.html

  public selectedProduct: Product;
  public productList: Product[];

  constructor(
    public productService: ProductService,
    public router: Router,
    public http: HttpClient,
    public route:ActivatedRoute
  ) { }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigate(['/productDetail', this.selectedProduct.id]);
  }

  getProductListProductsAvailable() {
    this.productService.getProductList().subscribe(
      response => {
        console.log(JSON.stringify(response));
        this.productList = JSON.parse(response);
      },
      error => {
        console.log(error.error);
      }
    );
  }

  ngOnInit() {
    this.getProductListProductsAvailable();
  }
}
