import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubApiService } from 'src/app/github-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userData: any;

  constructor(
    private githubApiService: GithubApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the username from the route parameter
    const username = this.route.snapshot.params['username'];

    // Fetch user data using the GithubApiService
    this.githubApiService.getUserData(username).subscribe((userData) => {
      this.userData = userData;
    });
  }
  
  goBack() {
    // Navigate back to UserDetailsComponent with selected user's information
    this.router.navigate(['/user-list']);
  }
}
