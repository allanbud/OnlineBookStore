import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../models/product';
import {GetProductListService} from '../../services/get-product-list.service';
import {toArray} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public selectedProduct : Product;
  public checked: boolean;
  public productList: Product[];
  public allChecked: boolean;
  public removeProductList: Product[] = new Array();

  constructor(
    public getProductListService: GetProductListService,
    public router : Router
  ) { }

  onSelect(product:Product) {
    this.selectedProduct = product;
    this.router.navigate(['/viewProduct', this.selectedProduct.id]);
  }



  ngOnInit() {
    this.getProductListService.getProductList().subscribe(
      response => {
        console.log(JSON.stringify(response));
        this.productList = JSON.parse(JSON.stringify(response));
      },
      error => {
        console.log(error);
      }
    );
  }

}
