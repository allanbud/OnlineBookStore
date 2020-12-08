import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';


import { routing } from './app.routing';



import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LoginComponent } from './components/login/login.component';

import {LoginService} from './services/login.service';

import {FormsModule} from '@angular/forms';

import { HttpClientModule} from "@angular/common/http";


import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    routing,
    MatGridListModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
	  LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
