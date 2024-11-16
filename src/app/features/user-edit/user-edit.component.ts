import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { User } from '@app/interfaces/user';
import { UserFormComponent } from '@app/shared/user/user-form/user-form.component';
import { USER_ROUTES } from '@app/constants/routes.constants';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})

export class UserEditComponent implements OnInit {
  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  };

  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getOneUser();
  }

  /**
   * Retrieves the user data based on the `id` parameter from the route.
   * Subscribes to the route parameters, extracts the `id`, and calls the `getUser` method
   * of the `userService` to fetch the user data.
   * The fetched user data is then assigned to the `user` property.
   * 
   * @returns void
   */
  getOneUser(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = +params.get('id')!;
      this.userService.getUser(this.userId).subscribe({
        next: (response) => {
          this.user = response.data;
        },
        error: (err) => {
          if (err.status === 404) {
            this.router.navigate([USER_ROUTES.NOT_FOUND]);
          } else {
            console.error('An error occurred:', err);
          }
        },
      });
    });
  }

  /**
   * Handles the submission of the updated user data to the server.
   * If the `userId` exists, it calls the `updateUser` method from the `userService` to send
   * the updated user information.
   * Upon successful update, the user is redirected to the home page and a success message is shown.
   * If there is an error during the update, an error message is displayed.
   * 
   * @param updatedUser The updated user object containing the modified user data.
   * @returns void
   */
  onFormSubmit(updatedUser: User): void {
    if (this.userId) {
      this.userService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          alert('User updated successfully');
          this.router.navigate([USER_ROUTES.HOME]);
        },
        error: () => {
          alert('Error updating user');
        },
      });
    }
  }
}
