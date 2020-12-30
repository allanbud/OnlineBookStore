import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Product } from '../../models/product';
import {ProductService} from '../../services/product.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RemoveProductService} from '../../services/remove-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

//https://www.itsolutionstuff.com/post/angular-9-8-datatable-example-with-pagination-sorting-filteringexample.html

  public selectedProduct: Product;
  public productList: Product[];

  public isAdmin = false;
  public user: User = new User();

  //checked product placed in this array
  public removeProductList: Product[] = new Array();
  public allChecked: boolean;

  constructor(
    public productService: ProductService,
    public router: Router,
    public http: HttpClient,
    public route:ActivatedRoute,
    public userService: UserService,
    public dialog : MatDialog,
    public removeProductService: RemoveProductService
  ) { }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigate(['/productDetail', this.selectedProduct.id]);
  }

  onEdit(product:Product) {
    this.selectedProduct = product;
    this.router.navigate(['/viewProduct', this.selectedProduct.id]);
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

  //TODO To make a checkbox indeterminated
  updateSelected(checked: boolean) {
    if(checked) {
      //create checked flag
      this.allChecked = true;
      //copy an array to this removeProductList withou coping refference address (use slice)
      this.removeProductList=this.productList.slice();
    } else {
      this.allChecked=false;
      this.removeProductList=[];
    }
  }

  //Dialog to confirm delete (Angular Mat Diag Comp)
  openDialog(product : Product) {
    let dialogRef = this.dialog.open(DialogResult);
    dialogRef.afterClosed().subscribe(
      response => {
        console.log("ProductListComponent openDialog: " + response);
        if(response == "yes") {
          this.removeProductService.sendProduct(product.id).subscribe(
            response => {
              console.log(response);
              this.getProductListProductsAvailable();
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  getCurrentUserStatus() {
    this.userService.getCurrentUser().subscribe(
      response => {
        if (response.includes("ROLE_ADMIN"))
        {this.isAdmin = true}
      },
      error => {
        console.log(error.error);
      }
    );
  }

  updateRemoveProductList(checked : boolean, product :  Product) {
    if(checked) {
      this.removeProductList.push(product);
    } else { //splice = remove
      this.removeProductList.splice(this.removeProductList.indexOf(product), 1);
    }
  }

  removeSelectedProducts() {
    let dialogRef = this.dialog.open(DialogResult);
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if(result=="yes") {
          for (let product of this.removeProductList) {
            this.removeProductService.sendProduct(product.id).subscribe(
              response => {

              },
              error => {
              }
            );
          }
          location.reload();
        }
      }
    );
  }

  ngOnInit() {
    this.getCurrentUserStatus();
    this.getProductListProductsAvailable();
  }


/*
    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        if(params['productList']) {
          console.log("filtered product list");
          this.productList = JSON.parse(params['productList']);
        } else {
          this.productService.getProductList().subscribe(
            response => {
              console.log(JSON.stringify(JSON));
              this.productList = JSON.parse(response);
            },
            error => {
              console.log(error.error);
            }
          );
        }
      });
    }
*/

}

//Close related components better be in one component file
@Component({
  selector: 'dialog-result',
  templateUrl: './dialog-result.html'
})
export class DialogResult {
  constructor(public dialogRef: MatDialogRef<DialogResult>) {}
}
