import { Component } from '@angular/core';
import { HeaderComponent } from '../shared';
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavComponent,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
