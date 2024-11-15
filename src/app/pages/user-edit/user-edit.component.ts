import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { User, OneUser } from '@app/interfaces/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  };

  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOneUser();
  }

  /**
 * Fetches a user's details based on the `id` parameter from the route and populates the user data.
 * This method listens to changes in the URL and fetches the corresponding user information using the `userService`.
 * 
 * @returns {void} This method does not return anything. It modifies the `user` property of the component.
 */

  getOneUser(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      this.userService.getUser(this.userId).subscribe(response => {
        this.user = response.data;
      });
    });
  }

/**
 * Submits the updated user information to the backend using the `userService`.
 * On success, it shows a success message and navigates back to the home page.
 * If an error occurs, an error message is displayed.
 * 
 * @returns {void} This method does not return anything. It handles the form submission logic.
 */
  onSubmit(): void {
    this.userService.updateUser(this.userId, this.user).subscribe({
      next: () => {
        alert('User updated successfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Error updating user');
      }
    });
  }
}
