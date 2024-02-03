import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GithubApiService } from '../github-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
  username: string = ''; 
  repositories: any[] = [];
  currentPage = 1;
  pageSize = 10;

  constructor(private githubApiService: GithubApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const usernameParam = params.get('username');
      this.username = usernameParam || ''; // Use an empty string if 'usernameParam' is null
      this.loadRepositories();
    });
  }

  onViewRepository(repoName: string) {
    // Generate the route for the repository details page, including the username and repo name
    const repoDetailsRoute = ['/user-details', this.username, 'repos', repoName];
    this.router.navigate(repoDetailsRoute);
  }
  
  loadRepositories() {
    // Check if the username is available
    if (this.username !== null) {
      // Call your service method to fetch the repositories for the user using the GitHub API or any other data source
      this.githubApiService.getUserRepositories(this.username).subscribe(
        (repositories: any[]) => {
          // Assign the fetched repositories to the 'repositories' array
          this.repositories = repositories;
        },
        (error) => {
          console.error('Error fetching user repositories:', error);
        }
      );
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadRepositories();
  }
}
