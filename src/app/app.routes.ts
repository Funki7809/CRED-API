import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserEditComponent } from '@pages/user-edit/user-edit.component';
export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'user/:id', component: UserEditComponent }
];
