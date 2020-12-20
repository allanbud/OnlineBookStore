import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GetProductService} from '../../services/get-product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})

//id will be passed to this component
export class ViewProductComponent implements OnInit {

  public product : Product = new Product();
  public productId: number;

  constructor(private getProductService : GetProductService,
              private route  :ActivatedRoute, private router:Router) { }

  onSelect(product : Product) {
    this.router.navigate(['/editProduct', this.product.id]);
    // .then(success => location.reload()) ;
  }


  ngOnInit() {
    //this.route is ActivatedRoute type NOT Router type!!

    //id is an only parameter and forEach not nesessary now?
    //id is defined in modules and in routing
    this.route.params.forEach((params: Params) => {
      this.productId = Number.parseInt(params['id']);
    });


    //Remember this is asynchronous call!!!!
    this.getProductService.getProduct(this.productId).subscribe(
      response => {
        this.product = JSON.parse(JSON.stringify(response));
      },
      error => {
        console.log(error);
      }
    );


  }



}
