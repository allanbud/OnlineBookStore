import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {AddProductService} from '../../services/add-product-service.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  public newProduct: Product = new Product();
  public productAdded: boolean;

  constructor(private addProductService : AddProductService) { }

  onSubmit() {
    this.addProductService.sendProduct(this.newProduct).subscribe(
      response => {
        this.productAdded=true;
        this.newProduct = new Product();
        this.newProduct.active=true;
        this.newProduct.productCategory="Electronics";
        this.newProduct.productType="Type A";
        this.newProduct.inStockNumber=1;
        this.newProduct.productTitle="iPhone";
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.productAdded=false;
    this.newProduct.active=true;
    this.newProduct.productCategory="Electronics";
    this.newProduct.productType="Type A";
    this.newProduct.inStockNumber=1;
    this.newProduct.productTitle="iPhone";
  }

}
