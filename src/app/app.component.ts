import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RegisterComponent } from './commponents/public/register/register.component';
import { AddProductsComponent } from './component/product/add-products/add-products.component';
import { CargandoComponent } from './component/template/cargando/cargando.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  RouterOutlet,
  CargandoComponent,
  NavbarComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'productosOptica';
}
