import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gists',
  templateUrl: './gists.component.html',
  styleUrls: ['./gists.component.css']
})
export class GistsComponent implements OnInit {
  gists: any[] = [];
  currentPage = 1;
  pageSize = 10;
  username: string | undefined;

  constructor(private githubApiService: GithubApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const usernameParam = params.get('username'); // Get the username from the route parameter
      if (usernameParam !== null) {
        this.username = usernameParam; // Assign the value if it's not null
        this.loadGists();
      }
    });
  }
  

  loadGists() {
    if (this.username) {
      this.githubApiService.getGists(this.username, this.currentPage, this.pageSize).subscribe((data: any) => {
        this.gists = data;
        console.log(data)
      }, error => {
        console.error('Error fetching gists:', error);
      });
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadGists();
  }

  goBack() {
    // Navigate back to UserDetailsComponent with selected user's information
    this.router.navigate(['/user-details', this.username]);
  }
}
