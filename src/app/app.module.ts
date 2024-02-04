import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from 'src/app/Pages/Users/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepositoriesComponent } from './repositories/repositories.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { GistsComponent } from './gists/gists.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailsComponent,
    UserListComponent,
    RepositoriesComponent,
    FollowersComponent,
    FollowingComponent,
    GistsComponent,
    RepoDetailsComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormsModule, ReactiveFormsModule], // Add this line
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
