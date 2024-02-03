import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  userData: any;
  private baseUrl = "https://api.github.com"
  constructor(private http: HttpClient) { }

  // searchUsers(query: string, page = 1) {
  //    return this.http.get(`${this.baseUrl}/search/users?q=${query}&page=${page}&per_page=10`);
  // }
  searchUsers(query: string, page: number = 1, perPage: number = 10) {
    const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get(`https://docs.github.com/users/${username}`);
  }
  getUserData(username: string): Observable<any> {
    // Fetch user data from your API
    return this.http.get(`https://api.github.com/users/${username}`);
  }
  getUserRepos(username: string, page: number, perPage: number): Observable<any> {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }
  getFollowers(username: string): Observable<any[]> {
    const url = `https://api.github.com/users/${username}/followers`;
    return this.http.get<any[]>(url);
  }
  getFollowing(username: string, page: number, perPage: number): Observable<any> {
    const url = `https://api.github.com/users/${username}/following?page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }
  
  getGists(username: string, page: number, perPage: number): Observable<any> {
    const url = `https://api.github.com/users/${username}/gists?page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }
  getUsersS(page: number, perPage: number): Observable<any> {
    const url = `https://api.github.com/users?page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }

  getUserRepositories(username: string): Observable<any[]> {
    const url = `https://api.github.com/users/${username}/repos`;

    // Send a GET request to the GitHub API to fetch the user's repositories
    return this.http.get<any[]>(url);
  }

  // getUsers(query: string, page: number) {
  //   return this.http.get(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`).pipe(
  //     tap((response: any) => console.log('API Response:', response))
  //   );

    
  // }
  getUsers(page: number, perPage: number): Observable<any> {
    const url = `https://api.github.com/search/users?page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }
  }
