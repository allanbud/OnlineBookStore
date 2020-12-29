
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';


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


import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {PaymentServiceService} from './services/payment-service.service';
import { ShippingService } from './services/shipping.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { OrderService } from './services/order.service';

import {HomeComponent} from './components/home/home.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MyAccountComponent } from './components/my-account/my-account.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {AppComponent} from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderComponent } from './components/order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent,
    MyProfileComponent,
    ProductListComponent,
    DataFilterPipe,
    ProductDetailComponent,
    ShoppingCartComponent,
    OrderComponent
  ],
  entryComponents: [
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
    MatDialogModule
  ],
  providers: [
    MatDialog,
    LoginService,
    UserService,
    PaymentServiceService,
    ShippingService,
    ProductService,
    CartService,
    CheckoutService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
