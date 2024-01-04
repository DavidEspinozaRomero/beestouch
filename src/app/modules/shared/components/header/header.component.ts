import { Component, EventEmitter, Output, inject } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

import { CartService } from '../../../payments/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleNav = new EventEmitter<boolean>();
  hidden = false;
  cartService = inject(CartService);
  count = this.cartService.count;

  toggleSideNav() {
    this.toggleNav.emit(true);
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
