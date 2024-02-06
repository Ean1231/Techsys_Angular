import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, tap } from 'rxjs';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  userData: any;
  private baseUrl = "https://api.github.com"
  constructor(private http: HttpClient) { }
  private apiUrl = 'https://api.github.com/search/users';
  private Url = 'https://api.github.com/users'
  private api = 'https://api.github.com/';
  private accessToken = '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';

  

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

  getUserRepositories(username: string, page: number, perPage: number): Observable<any[]> {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;
    return this.http.get<any[]>(url);
  }
  getUser(query: string, page: number, perPage: number): Observable<any> {
    const params = {
      q: query,
      page: page.toString(),
      per_page: perPage.toString()
    };

    return this.http.get(this.Url, { params });
  }
  getUsers(query: string, page: number): Observable<any> {
    // Define the headers with your access token
    const headers = {
      Authorization: `token ${this.accessToken}`
    };
  
    // Convert Axios promise to an observable and include the headers
    return from(
      axios.get(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`, { headers })
        .catch(error => {
          console.log('Axios request failed:', error.response);
        })
    );
  }
  
  gePeople() {
    return axios.get('https://api.github.com/users', {
      params: { per_page: 10 } // Fetch 10 users at a time
    });
  }
  
  getDefaultUsers() {
    return axios.get('https://api.github.com/users', {
      params: { per_page: 10 }, // Adjust per_page as needed
    });
  }

  // Function to search for users based on a query
  searchUsers(query: string, page: number = 1) {
    return axios.get('https://api.github.com/search/users', {
      params: {
        q: query,
        page: page,
        per_page: 10, // Adjust per_page as needed
      },
    });
  }
  

  // getUsers(query: string, page: number) {
  //   return this.http.get(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`).pipe(
  //     tap((response: any) => console.log('API Response:', response))
  //   );

    
  // }
  // getUsers(page: number, perPage: number): Observable<any> {
  //   const url = `https://api.github.com/search/users?page=${page}&per_page=${perPage}`;
  //   return this.http.get(url);
  // }
  }
