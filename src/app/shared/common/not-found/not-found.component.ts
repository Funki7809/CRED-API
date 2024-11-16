import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USER_ROUTES } from '@app/constants/routes.constants';
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  /**
   * Navigates to the home page.
   */
  goHome(): void {
  this.router.navigate([USER_ROUTES.HOME]);
  }
}
