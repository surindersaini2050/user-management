import { Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';

export const routes: Routes = [
    {path:'user-management', component: UserManagementComponent},
    {path:'**', redirectTo: 'user-management'},
];
