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
  totalPages = 1; // Initialize to 1, update it when fetching data
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
      this.githubApiService.getGists(this.username, this.currentPage, this.pageSize).subscribe(
        (data: any) => {
          this.gists = data;
          if (data.length > 0) {
            // Calculate the total pages based on the total number of gists
            this.totalPages = Math.ceil(data[0].owner.public_gists / this.pageSize);
          }
        },
        error => {
          console.error('Error fetching gists:', error);
        }
      );
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadGists();
  }

  // Function to limit the displayed page numbers
  getDisplayedPageNumbers() {
    const maxDisplayedPages = 5; // Adjust the maximum displayed page numbers
    const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);
    const startPage = Math.max(1, this.currentPage - halfMaxDisplayedPages);
    const endPage = Math.min(this.totalPages, startPage + maxDisplayedPages - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
  }

  goBack() {
    // Navigate back to UserDetailsComponent with selected user's information
    this.router.navigate(['/user-details', this.username]);
  }
}
