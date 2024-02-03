import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Repository } from 'src/app/repos/repos'; 
import { Observable, tap } from 'rxjs';
import { GithubUser } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

 
  private baseUrl = "https://api.github.com"
  constructor(private http: HttpClient) { }

  searchUsers(query: string, page = 1) {
     return this.http.get(`${this.baseUrl}/search/users?q=${query}&page=${page}&per_page=10`);
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`https://docs.github.com/rest/users/${username}`);
  }
  
  getUsers(query: string, page: number = 1) {
    return this.http.get(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`).pipe(
      tap(response => console.log('API Response:', response))
    );
    
  }
  
  

//   getUserRepos(username: string, page: number = 1) {
//     return this.http.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=10`);
//   }

  
// getUserRepos(username: string, page: number = 1): Observable<Repository[]> {
//     return this.http.get<Repository[]>(`https://api.github.com/users/${username}/repos?page=${page}&per_page=10`);
//   }
  

}
