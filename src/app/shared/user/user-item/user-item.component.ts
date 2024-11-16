import { Component, Input, EventEmitter, Output } from '@angular/core';
import { User } from '@app/interfaces/user';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
import { USER_ROUTES } from '@app/constants/routes.constants';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})

export class UserItemComponent {
  @Input() user!: User;
  @Output() userDeleted = new EventEmitter<number>();

  constructor(
    private service: UserService,
    private router: Router
  ) { }

  /**
   * Delete a user when the button is clicked
   * @param {number} userId - The ID of the user to delete
   */
  onDeleteUser(userId: number): void {
    this.service.deleteUser(userId).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.userDeleted.emit(userId);
      }
    });
  }

  /**
   * Redirects to the edit page of a specific user.
   * 
   * This method uses Angular's `Router` service to navigate to the edit route
   * of the user, passing the `userId` as a parameter in the URL.
   * 
   * @param userId - The unique identifier of the user to edit. This parameter is 
   *                 used to generate the URL for the edit page.
   */
  onEditUser(userId: number): void {
    this.router.navigate([USER_ROUTES.EDIT_USER(userId)]);
  }
}
