import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule,MatSidenavModule, HeaderComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  
  bgCubes = Array(16*12)
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
