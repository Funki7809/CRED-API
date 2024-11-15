import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserItemComponent } from '../../components/user-item/user-item.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { EMPTY, Observable, catchError } from 'rxjs';
import { UsersResponse } from '../../interfaces/user';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AsyncPipe, UserItemComponent, ErrorMessageComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  public users$!: Observable<UsersResponse>;
  public errorMessage!: string;
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.users$ = this.service.getUsers().pipe(catchError((error: string) => {
      this.errorMessage = error;
      return EMPTY;
    }));
  }
}
