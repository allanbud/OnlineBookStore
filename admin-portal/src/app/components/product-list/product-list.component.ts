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
