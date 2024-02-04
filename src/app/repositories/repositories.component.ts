import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubApiService } from '../github-api.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
  repositories: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1; // Initialize to 1, update it when fetching data
  username: string | null = null;
  followers: any[] = [];
  totalFollowers = 0;

  constructor(
    private githubApiService: GithubApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.loadRepositories();
    });
  }

  loadRepositories() {
    if (this.username) {
      // Increase the pageSize to fetch more data
      const largerPageSize = 20; // You can adjust this value
      this.githubApiService.getUserRepositories(this.username, this.currentPage, largerPageSize).subscribe(
        (data: any) => {
          this.repositories = data;
          if (data.total_count && largerPageSize) {
            this.totalPages = Math.ceil(data.total_count / largerPageSize);
          } else {
            this.totalPages = 4 // Set a default value in case data is missing
          }
          console.log('totalPages:', this.totalPages);
          console.log('currentPage:', this.currentPage);
        },
        error => {
          console.error('Error fetching repositories:', error);
        }
      );
    }
  }
  
  

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRepositories();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadRepositories();
    }
  }

  get pagedRepositories() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.repositories.slice(startIndex, startIndex + this.pageSize);
  }

  // Assuming you have a similar method for followers
  // get pagedFollowers() {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   return this.followers.slice(startIndex, startIndex + this.pageSize);
  // }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadRepositories(); // Load repositories with the updated page
    }
  }

  goBack() {
    // Navigate back to UserDetailsComponent with selected user's information
    this.router.navigate(['/user-details', this.username]);
  }
}
