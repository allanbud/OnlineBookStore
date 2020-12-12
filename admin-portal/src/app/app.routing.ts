import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AddNewProductComponent} from './components/add-new-product/add-new-product.component';

const appRoutes: Routes = [
	{
		path : '',
		redirectTo: '/login',
		pathMatch: 'full'
	},

  //path:
	{
		path: 'login',
		component: LoginComponent
	},
  {
    path: 'addNewProduct',
    component: AddNewProductComponent
  }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
