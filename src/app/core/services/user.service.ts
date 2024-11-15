import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  UsersResponse } from '../../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(page: number = 1, perPage: number = 12): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`https://reqres.in/api/users/?page=${page}&per_page=${perPage}`);
  }
}
