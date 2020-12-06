import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';


import {MatButtonModule} from '@angular/material/button';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';

import {LoginService} from './services/login.service';

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
    BrowserAnimationsModule
  ],
  providers: [
	  
	  LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
