import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isLoading: boolean = false; 
  users: any[] = [];
  total_count: number = 0;
  inputQuery: string = ''; // Bound to the input field
  private defaultQuery: string = 'a'; // Default query used internally
  page: number = 1;
  private debounceTimeout: any;
  constructor(private githubService: GithubApiService) { }

  ngOnInit(): void {
    this.loadUsers(this.defaultQuery); // Load users with the default query when the page loads
  }

  loadUsers(query: string = this.defaultQuery, page: number = this.page): void {
    // Set isLoading to true when fetching data
    this.isLoading = true;

    // Use the default query if inputQuery is empty
    if (this.inputQuery.trim() !== '') {
      query = this.inputQuery;
    }

    this.githubService.getUsers(query, page).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.users = response.data.items;
          this.total_count = response.data.total_count;
        } else {
          console.error('Invalid API response:', response);
          this.users = [];
          this.total_count = 0;
        }

        // Set isLoading to false when data is fetched
        this.isLoading = false;
      },
      (error: any) => {
        if (error.status === 403) {
          // Handle rate limiting, display a message to the user
          console.error('Rate limit exceeded. Please try again later.');
        } else {
          console.error('An error occurred:', error);
          this.users = [];
          this.total_count = 0;
        }

        // Set isLoading to false on error
        this.isLoading = false;
      }
    );
  }
  

  onSearch(): void {
    this.page = 1; // Always reset to the first page for a new search
    this.loadUsers(); // Load users with the inputQuery
  }

  onSearchQueryChange(): void {
    this.debounceTimeout = setTimeout(() => {
      if (!this.inputQuery.trim()) {
        // Input is empty, revert to default query
        this.page = 1; // Reset to the first page
        this.loadUsers(this.defaultQuery);
      // Perform the search after the debounce period
      this.onSearch();
    }  }, 300);
    // Load users with the default query
    }
  
  

  onPageChange(page: number): void {
    this.page = page;
    this.loadUsers(); // Load users with the inputQuery
  }
}
