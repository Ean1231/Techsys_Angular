// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { GithubService } from 'src/Service/service';

// export interface Repository {
//     // Define properties based on the GitHub API response structure
//     id: number;
//     name: string;
//     // include other properties as needed
//   }
  

// @Component({
//   selector: 'app-repos',
//   templateUrl: './repos.component.html',
//   styleUrls: ['./repos.component.css']
// })
// export class ReposComponent implements OnInit {
//   [x: string]: Object;
//   username!: string;
//   repos: any[] = [];

//   constructor(
//     private githubService: GithubService,
//     private route: ActivatedRoute
//   ) { }

//   ngOnInit() {
//     const username = this.route.snapshot.paramMap.get('username');
//     if (!username) {
//       // Handle the null case, maybe redirect or show an error
//       console.error('Username is null');
//       return;
//     }
  
//     this.username = username;
//     this.githubService.getUserDetails(this.username).subscribe(details => {
//       this['userDetails'] = details;
//     });
//   }

//   fetchRepos(page: number = 1) {
//     this.githubService.getUserRepos(this.username, page).subscribe(data => {
//       this.repos = data;
//     });
//   }
// }
