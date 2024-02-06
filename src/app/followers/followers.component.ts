import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { GithubApiService } from '../github-api.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  username: string = '';
  followers: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalFollowers = 0;

  constructor(private githubApiService: GithubApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const usernameParam = params.get('username');
      if (usernameParam !== null) {
        this.username = usernameParam;
        this.loadFollowers();
      }
    });
  }

  loadFollowers() {
    if (this.username) {
      // Increase the pageSize to fetch more data
      const largerPageSize = 20; // You can adjust this value
      this.githubApiService.getFollowers(this.username).subscribe(
        (followers: any[]) => {
          // Append the newly fetched followers to the existing list
          this.followers = this.followers.concat(followers);
          this.totalFollowers = this.followers.length;
        },
        (error: any) => {
          console.error('Error fetching user followers:', error);
        }
      );
    }
  }

  get pagedFollowers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.followers.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.totalFollowers / this.pageSize);
  }

  get pages() {
    const visiblePages = 5; // Adjust the number of visible page numbers as needed
    const halfVisiblePages = Math.floor(visiblePages / 2);
    const startPage = Math.max(1, this.currentPage - halfVisiblePages);
    const endPage = Math.min(this.totalPages, startPage + visiblePages - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadFollowers(); // Load followers with the updated page
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadFollowers();
    }
  }

  goBack() {
    // Navigate back to UserDetailsComponent with selected user's information
    this.router.navigate(['/user-details', this.username]);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadFollowers();
    }
  }
}
