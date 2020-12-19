import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AddNewProductComponent} from './components/add-new-product/add-new-product.component';
import {ProductListComponent} from './components/product-list/product-list.component';

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
  },
  {
    path: 'productList',
    component: ProductListComponent
  }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
