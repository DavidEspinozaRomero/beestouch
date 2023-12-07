import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  toggleSidenav = new EventEmitter<boolean>();

  constructor() {}

  toggleSideNav() {
    this.toggleSidenav.emit(true);
  }
}
