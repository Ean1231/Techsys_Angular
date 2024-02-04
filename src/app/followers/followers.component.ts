import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

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
      this.githubApiService.getFollowers(this.username).subscribe(
        (followers: any[]) => {
          this.followers = followers;
          this.totalFollowers = followers.length;
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
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  goBack() {
    // Navigate back to UserDetailsComponent with selected user's information
    this.router.navigate(['/user-details', this.username]);
  }
  

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
