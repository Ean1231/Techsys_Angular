import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../app/Pages/Users/user.component'; 
import {UserDetailsComponent} from '../app/user-details/user-details.component'
import { UserListComponent } from './user-list/user-list.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { GistsComponent } from './gists/gists.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';

const routes: Routes = [
  { path: '', component: UserListComponent }, // Default route
  { path: 'user-details/:username', component: UserDetailsComponent },
  { path: ':username/repos', component: RepositoriesComponent },
  { path: ':username/followers', component: FollowersComponent},
  { path: ':username/following', component: FollowingComponent },
  { path: ':username/gists', component: GistsComponent },
  { path: ':username/repo/:repoName', component: RepoDetailsComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'repositories', component: RepositoriesComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

