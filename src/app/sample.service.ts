import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from './job';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  private url = 'http://localhost:8080/jobs/all';
  private global_url = "http://10.161.190.42:7777/user/";


  constructor(
    private http: HttpClient) { }

  getData(): Observable<Job[]> {
    return this.http.get<Job[]>(this.url);
  }
  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.global_url + 'all').pipe(map((response: any) => {
      return response.result;
    }));
  }
  addUser(user: User) {
    console.log("under service ", user)
    return this.http.post(this.global_url + "add", user);
  }
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.global_url + userId)
  }
  updateUser(user: User): Observable<User> {

    return this.http.put<User>(this.global_url + 'update/' + user._id, user);
  }
  deleteUserByUserId(userId: string): Observable<string> {
    return this.http.delete<string>(this.global_url + 'delete/' + userId);
  }
}