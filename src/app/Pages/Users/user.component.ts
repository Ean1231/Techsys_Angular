import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/Service/service'; 
import { GithubUser } from 'src/app/models/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // user: any;
  username: string | null = null;
  user: GithubUser | null = null;

  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    if (this.username) {
      this.githubService.getUserDetails(this.username).subscribe(
        userDetails => {
          console.log(userDetails); // This should log user details to the console
          this.user = userDetails;
        },
        error => {
          console.log('Error fetching user details:', error);
        }
      );
      
    }
  }
}
