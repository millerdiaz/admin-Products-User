import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './commponents/public/register/register.component';
import { AddProductsComponent } from './component/product/add-products/add-products.component';
import { LoginComponent } from './commponents/public/login/login.component';
import { UsersComponent } from './component/users/users/users.component';

export const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'login'},
  {path:'home',component:HomeComponent},
  {path:'addProducts',component:AddProductsComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'',pathMatch:'full', redirectTo:'login'},
  {path:'users',component:UsersComponent}

];
