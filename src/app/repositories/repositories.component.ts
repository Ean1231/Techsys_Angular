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
  totalItems = 0;
  totalPages = 1; // Initialize to 1, update it when fetching data
  username: string | null = null;

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
        // Replace the existing repositories with the newly fetched data
        this.repositories = data;
        // Retrieve the total number of repositories from the API response
        this.totalItems = data.length;
        // Calculate the total pages based on the total number of repositories
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
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

  get pages() {
    const visiblePages = 3; // Adjust the number of visible page numbers as needed
    const halfVisiblePages = Math.floor(visiblePages / 2);
    const startPage = Math.max(1, this.currentPage - halfVisiblePages);
    const endPage = Math.min(this.totalPages, startPage + visiblePages - 1);
  
    // Ensure that there are always 5 pages visible if possible
    if (endPage - startPage + 1 < visiblePages) {
      const diff = visiblePages - (endPage - startPage + 1);
      if (startPage - diff > 0) {
        return Array.from({ length: visiblePages }, (_, i) => i + startPage - diff);
      }
      return Array.from({ length: visiblePages }, (_, i) => i + startPage);
    }
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
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
