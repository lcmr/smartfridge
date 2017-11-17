import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { StoresComponent } from './stores/stores.component';
import { FridgeComponent } from './fridge/fridge.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: ProfileComponent, canActivate:[AuthGuard] },
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'tienda', component: StoresComponent, canActivate:[AuthGuard]},
  {path: 'refri/:id', component: FridgeComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
