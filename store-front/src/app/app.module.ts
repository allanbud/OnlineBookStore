
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';


import { routing } from './app.routing';
import { RouterModule } from '@angular/router';

import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {PaymentServiceService} from './services/payment-service.service';


import {FormsModule} from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


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



import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent,
    MyProfileComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
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
    PaymentServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
