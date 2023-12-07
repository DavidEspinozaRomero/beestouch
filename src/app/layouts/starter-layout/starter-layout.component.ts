import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from '../../modules/shared/components/sidenav/sidenav.component';

@Component({
  selector: 'app-starter-layout',
  standalone: true,
  imports: [SidenavComponent, RouterModule],
  templateUrl: './starter-layout.component.html',
  styleUrl: './starter-layout.component.scss'
})
export class StarterLayoutComponent {

}
