import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  UsersResponse } from '../../interfaces/user';
import { DEFAULT_PAGINATION } from './user.service.constants';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

/**
 * Fetches a list of users from the ReqRes API.
 *
 * This function performs an HTTP GET request to the ReqRes users API and returns a paginated response
 * containing users. The `page` and `perPage` parameters are optional and default to the values defined in
 * `DEFAULT_PAGINATION` if not provided. If not passed, the default page is 1 and 12 users per page.
 *
 * @param {number} [page=DEFAULT_PAGINATION.page] - The page number to fetch (defaults to 1).
 * @param {number} [perPage=DEFAULT_PAGINATION.perPage] - The number of users per page (defaults to 12).
 * 
 * @returns {Observable<UsersResponse>} An observable that emits the API response, 
 * which includes the user data and pagination information.
 */
  getUsers(page: number = DEFAULT_PAGINATION.page, perPage: number = DEFAULT_PAGINATION.perPage): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`https://reqres.in/api/users/?page=${page}&per_page=${perPage}`);
  }
}
