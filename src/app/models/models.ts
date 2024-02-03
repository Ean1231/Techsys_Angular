export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio?: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}
