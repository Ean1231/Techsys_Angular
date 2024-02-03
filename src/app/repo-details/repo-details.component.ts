import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent {
  username!: string | null;
  repoName!: string | null;
  repositoryDetails: any; 

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient 
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.repoName = params.get('repoName');
    });

    this.loadRepositoryDetails();
  }

  loadRepositoryDetails() {
    if (this.username && this.repoName) {
      const apiUrl = `https://api.github.com/repos/${this.username}/${this.repoName}`;

      this.httpClient.get(apiUrl).subscribe(
        (repositoryDetails: any) => {
          this.repositoryDetails = repositoryDetails;
        },
        (error: any) => {
          console.error('Error fetching repository details:', error);
        }
      );
    }
  }
}
