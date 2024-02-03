import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  total = 0;
  page = 1;
  perPage = 10;
  searchQuery = '';
  currentPage = 1;
  pageSize = 10;
  form: FormGroup;

  constructor(
    private githubApiService: GithubApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      searchQuery: [''], // Initialize with an empty string or default value
    });
  }

  ngOnInit() {
    this.loadAllUsers();// Load users when the component is initialized
  }

  loadUsers(query: string = '', page: number = this.page) {
    this.githubApiService.searchUsers(query, page, this.perPage).subscribe(
      (response: any) => {
        this.users = response.items;
        this.total = response.total_count;
      },
      (error) => {
        console.error('There was an error fetching the users:', error);
      }
    );
  }

  loadAllUsers() {
    this.githubApiService.getUsersS(this.page, this.perPage).subscribe((response: any) => {
      this.users = response;
      this.total = response.length; // Update the total count
    }, (error: any) => {
      console.error('There was an error fetching the users:', error);
    });
  }

  onSearch(query: string) {
    if (query && query.trim()) {
      this.loadUsers(query.trim());
    } else {
      this.searchQuery = ''; // Reset the search query
      this.loadAllUsers(); // Load all users when the search bar is cleared
      console.log('Search query is empty. Please provide a valid query.');
    }
  }
  
  

  onViewUserList(user: any) {
    const username = user.login;
    this.router.navigate(['/user-details', username]);
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadUsers(this.searchQuery, page);
  }
}
