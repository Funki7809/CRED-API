import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserItemComponent } from '@components/user-item/user-item.component';
import { ErrorMessageComponent } from '@components/error-message/error-message.component';
import { EMPTY, Observable, catchError } from 'rxjs';
import { UsersResponse } from '@app/interfaces/user';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsyncPipe,
    UserItemComponent,
    ErrorMessageComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  users$!: Observable<UsersResponse>;
  errorMessage!: string;
  successMessage: string = ''; 

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

/**
 * Fetches all users using the `userService` and handles errors gracefully.
 * The users' data is stored in the `users$` observable. If an error occurs during the fetch,
 * the error message is stored in the `errorMessage` property and an empty observable is returned.
 * 
 * @returns {void} This method does not return anything. It updates the `users$` observable and handles errors.
 */
  getAllUsers(): void {
    this.users$ = this.service.getUsers().pipe(catchError((error: string) => {
      this.errorMessage = error;
      return EMPTY;
    }));
  }

/**
 * Handles the deletion of a user. Displays a success message and refreshes the list of users.
 * After a user is deleted, the `getAllUsers()` method is called to fetch the updated list of users.
 * 
 * @param {number} userId - The ID of the user to be deleted.
 * 
 * @returns {void} This method does not return anything. It updates the success message and refreshes the users list.
 */
  onUserDeleted(userId: number): void {
    this.successMessage = 'User deleted successfully!';
    this.getAllUsers();
  }
}
