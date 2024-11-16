import { Routes } from '@angular/router';
import { UserListComponent } from './features/user-list/user-list.component';
import { UserEditComponent } from '@app/features/user-edit/user-edit.component';
import { UserCreateComponent } from '@app/features/user-create/user-create.component';
import { NotFoundComponent } from '@app/shared/common/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'user/create', component: UserCreateComponent },
    { path: 'user/:id', component: UserEditComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
