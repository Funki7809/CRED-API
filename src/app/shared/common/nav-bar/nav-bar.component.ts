import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USER_ROUTES } from '@app/constants/routes.constants';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate([USER_ROUTES.HOME]);
  }
}
