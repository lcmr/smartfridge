import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { HttpModule } from '@angular/http';
import { RegistrarComponent } from './registrar/registrar.component';
import { LoginComponent } from './login/login.component';

import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { StoresComponent } from './stores/stores.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    UserlistComponent,
    UserdetailComponent,
    RegistrarComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    StoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
