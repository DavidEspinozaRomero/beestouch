import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderComponent } from '../header/header.component';
import { ProductsComponent } from '../../../products/products.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, HeaderComponent, ProductsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  navList = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'Landing',
      route: 'landing',
    },
    {
      name: 'Contact',
      route: 'contact',
    },
    {
      name: 'Payments',
      route: 'payments',
    },
  ];
}
