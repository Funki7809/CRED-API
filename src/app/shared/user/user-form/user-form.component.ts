import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@app/interfaces/user';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent {

  @Input() user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    password: ''
  };

  @Input() isEditMode: boolean = false;

  @Output() formSubmit = new EventEmitter<User>();

  /**
   * Handles the form submission when the user submits the form.
   * This method checks if the form is valid. If valid, it emits the `user` data
   * through the `formSubmit` event to the parent component.
   * If the form is invalid, it displays an alert notifying the user that all fields need to be completed.
   *
   * @param form The form object of type `NgForm` that contains the form controls and validation status.
   * @returns void
   */
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.formSubmit.emit(this.user);
    } else {
      alert('Fields need to be completed');
    }
  }
}
