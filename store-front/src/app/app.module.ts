
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';


import {AddProductService} from './services/add-product-service.service';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';



import { routing } from './app.routing';
import { RouterModule } from '@angular/router';

import {FormsModule} from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';

import { DataFilterPipe } from './components/product-list/data-lodash-filter.pipe';


import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {PaymentServiceService} from './services/payment-service.service';
import { ShippingService } from './services/shipping.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { OrderService } from './services/order.service';
import { WidgetService } from './services/widget.service';
import { LocationService } from './services/location.service';

import {HomeComponent} from './components/home/home.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MyAccountComponent } from './components/my-account/my-account.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {AppComponent} from './app.component';
import {DialogResult, ProductListComponent} from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderComponent } from './components/order/order.component';
import {RemoveProductService} from './services/remove-product.service';
import {ImageUploadService} from './services/image-upload.service';
import {ViewProductComponent} from './components/view-product/view-product.component';
import {GetProductService} from './services/get-product.service';
import {EditProductService} from './services/edit-product.service';
import {EditProductComponent} from './components/edit-product/edit-product.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent,
    MyProfileComponent,
    ProductListComponent,
    AddNewProductComponent,
    EditProductComponent,
    DataFilterPipe,
    ProductDetailComponent,
    ShoppingCartComponent,
    ViewProductComponent,
    OrderComponent,
    DialogResult
  ],
  entryComponents: [
    DialogResult,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    RouterModule,
    routing,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    MatOptionModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  providers: [
    MatDialog,
    GetProductService,
    AddProductService,
    ImageUploadService,
    LoginService,
    UserService,
    PaymentServiceService,
    LocationService,
    ShippingService,
    ProductService,
    CartService,
    CheckoutService,
    OrderService,
    WidgetService,
    EditProductService,
    RemoveProductService
  ],
  bootstrap: [AppComponent, DialogResult]
})
export class AppModule { }
