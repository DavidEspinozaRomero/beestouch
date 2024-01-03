import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule,MatSidenavModule,MatButtonModule, MatIconModule, HeaderComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  
  bgCubes = Array(8)
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
