import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GithubApiService } from 'src/app/github-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: any[] = [];
  total = 0;
  page = 1;
  perPage = 10;
  searchQuery = '';
  currentPage = 1;
  pageSize = 10;

  constructor(private githubApiService: GithubApiService, private router: Router) {}

  ngOnInit() {
    // this.loadUsers();
    // this. loadUsersS();
  }

  // loadUsers(query: string = '', page: number = this.page) {
  //   if (query.trim() !== '') {
  //     this.githubApiService.searchUsers(query, page, this.perPage).subscribe((response: any) => {
  //       this.users = response.items;
  //       this.total = response.total_count;
  //     }, error => {
  //       console.error('There was an error fetching the users:', error);
  //     });
  //   } else {
  //     // Handle empty query scenario, e.g., reset the user list or display a message
  //     console.log('Search query is empty. Please provide a valid query.');
  //     this.users = []; // Reset users or handle as appropriate
  //   }
  // }

  // loadUsersS() {
  //   this.githubApiService.getUsers(this.currentPage, this.pageSize).subscribe((data: any) => {
  //     this.users = data.items;
  //     // Assuming the API response includes an "items" property with user data
  //   });
  // }
  
  onSearch(query: string) {
    if (query && query.trim()) {
      // this.loadUsers(query.trim());
    } else {
      console.log('Search query is empty. Please provide a valid query.');
    }
  }
  // onViewUserList(user: any) {
  //   // Log the selected user's details in the console
  //   console.log('Selected User:', user);
  
  //   // Navigate to the user-details route and pass the username as a route parameter
  //   this.router.navigate(['/user-details', user.login]);
  // }
  
  onViewUserList(user: any) {
    const username = user.login; // Get the username from the selected user
    this.router.navigate(['/user-details', username]); // Navigate to the User Details page with the username as a parameter
  }
  
  onPageChange(page: number) {
    this.page = page;
    // this.loadUsers(this.searchQuery, page);
  }
}
