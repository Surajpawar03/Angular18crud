import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
    { path: '', redirectTo: 'user-list', pathMatch: 'full' },
    { path: 'user-list', component: UserListComponent },
    {
        path:'add-user',component:AddUserComponent
    }
  
  ];
