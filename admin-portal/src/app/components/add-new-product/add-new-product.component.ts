import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {AddProductService} from '../../services/add-product-service.service';
import {ImageUploadService} from '../../services/image-upload.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  public newProduct: Product = new Product();
  public productAdded: boolean;

  constructor(private addProductService : AddProductService,
              public imageUploadService : ImageUploadService) { }

  onSubmit() {
    this.addProductService.sendProduct(this.newProduct).subscribe(
      response => {

        let stringifiedJSON = JSON.stringify(response);
        let stringifiedJSON1 = JSON.stringify(JSON.parse(stringifiedJSON));

        this.imageUploadService.upload(JSON.parse(stringifiedJSON1).id);

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
