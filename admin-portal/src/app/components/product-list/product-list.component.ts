import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../models/product';
import {GetProductListService} from '../../services/get-product-list.service';
import {RemoveProductService} from '../../services/remove-product.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

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
  //checked product placed in this array
  public removeProductList: Product[] = new Array();

  constructor(
    public getProductListService: GetProductListService,
    public removeProductService: RemoveProductService,
    public dialog : MatDialog,
    public router : Router
  ) { }

  onSelect(product:Product) {
    this.selectedProduct = product;
    this.router.navigate(['/viewProduct', this.selectedProduct.id]);
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
              this.getProductList();
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  getProductList() {
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
    this.getProductList();
  }

}


//Close related components better be in one component file
    @Component({
      selector: 'dialog-result',
      templateUrl: './dialog-result.html'
    })
    export class DialogResult {
      constructor(public dialogRef: MatDialogRef<DialogResult>) {}
    }
