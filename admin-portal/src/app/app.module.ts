
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';


import { routing } from './app.routing';



import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LoginComponent } from './components/login/login.component';

import {LoginService} from './services/login.service';
import {AddProductService} from './services/add-product-service.service';
import {ImageUploadService} from './services/image-upload.service';
import {GetProductListService} from './services/get-product-list.service';


import {FormsModule} from '@angular/forms';

import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProductListComponent } from './components/product-list/product-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    AddNewProductComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    routing,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    MatOptionModule
  ],
  providers: [
	  LoginService,
    AddProductService,
    ImageUploadService,
    GetProductListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
