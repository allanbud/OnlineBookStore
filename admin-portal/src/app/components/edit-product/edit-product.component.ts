import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GetProductService} from '../../services/get-product.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {Product} from '../../models/product';
import {EditProductService} from '../../services/edit-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public productId: number;
  public product: Product = new Product();
  public productUpdated: boolean;

  constructor(
    public imageUploadService: ImageUploadService,
    public editProductService: EditProductService,
    public getProductService: GetProductService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  onSubmit() {
    this.editProductService.sendProduct(this.product).subscribe(
      response => {

        let stringifiedJSON = JSON.stringify(response);
        let stringifiedJSON1 = JSON.stringify(JSON.parse(stringifiedJSON));

        this.imageUploadService.modify(JSON.parse(stringifiedJSON1).id);

        this.productUpdated=true;
      },
      error => console.log(error)
  );
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.productId = Number.parseInt(params['id']);
    });

    this.getProductService.getProduct(this.productId).subscribe(
      responce => {
        this.product = JSON.parse(JSON.stringify(responce));
      },
      error => console.log(error)
  )
  }

}
