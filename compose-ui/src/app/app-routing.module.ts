import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProgressBarDemoComponent } from './progress-bar/progress-bar-demo.component';
import { UserDetailsComponent } from './users/user-details.component';
import { AuthGuard } from './auth.guard';
import { AuthLoginGuard } from './authlogin.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'progress-bar', component: ProgressBarDemoComponent, canActivate: [AuthGuard] },
  { path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}