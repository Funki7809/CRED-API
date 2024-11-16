import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { User, RegisterRequest } from '@app/interfaces/user';
import { UserFormComponent } from '@app/shared/user/user-form/user-form.component';
import { USER_ROUTES } from '@app/constants/routes.constants';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Handles the form submission for creating a new user.
   * This method constructs a `RegisterRequest` object using the data from the `newUser` object,
   * and calls the `registerUser` service method to register the user.
   * 
   * If the registration is successful, it shows an alert with a success message and navigates to the home page.
   * If there is an error during registration, it shows an alert with an error message.
   *
   * @param newUser The `User` object containing the user data (email, password, etc.) to be registered.
   * @returns void
   */
  onFormSubmit(newUser: User): void {
    const registerData: RegisterRequest = {
      username: '', // This is empty because the API has an error when validating this field, it only matches users previously restricted in it and only the email is valid.
      email: newUser.email,
      password: newUser.password,
    };

    this.userService.registerUser(registerData).subscribe({
      next: () => {
        alert('User created successfully');  
        this.router.navigate([USER_ROUTES.HOME]);
      },
      error: () => {
        alert('Error creating user');
      },
    });
  }
}
