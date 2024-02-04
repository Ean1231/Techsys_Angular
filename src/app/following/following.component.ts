import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubApiService } from '../github-api.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  following: any[] = [];
  currentPage = 1;
  pageSize = 10;
  username: string | null = null;

  constructor(
    private githubApiService: GithubApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.loadFollowing();
    });
  }

  loadFollowing() {
    if (this.username) {
      this.githubApiService.getFollowing(this.username, this.currentPage, this.pageSize).subscribe(
        (data: any) => {
          this.following = data;
        },
        error => {
          console.error('Error fetching following:', error);
        }
      );
    }
  }
  goBack() {
    // Navigate back to UserDetailsComponent with selected user's information
    this.router.navigate(['/user-details', this.username]);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadFollowing();
  }
}
