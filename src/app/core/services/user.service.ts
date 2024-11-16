import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  UsersResponse,
  User,
  OneUser,
  RegisterRequest,
  RegisterResponse
} from '@app/interfaces/user';
import { DEFAULT_PAGINATION, USER_ENDPOINTS } from '@services/user.service.constants';
import { environment } from "@envs/environment.development";

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
    const url = `${environment.apiUrlBase}${USER_ENDPOINTS.getAllUsers.replace('${page}', page.toString()).replace('${perPage}', perPage.toString())}`;

    return this.http.get<UsersResponse>(url);
  }

  /**
   * Fetches a single user from the ReqRes API by ID.
   *
   * @param {number} id - The ID of the user to fetch.
   * 
   * @returns {Observable<User>} An observable that emits the user data.
   */
  getUser(id: number): Observable<OneUser> {
    const url = `${environment.apiUrlBase}${USER_ENDPOINTS.getUserById.replace('${id}', id.toString())}`;
    return this.http.get<OneUser>(url);
  }

  /**
   * Deletes a user from the ReqRes API by ID.
   *
   * @param {number} id - The ID of the user to be deleted.
   * 
   * @returns {Observable<void>} An observable that emits when the deletion is successful.
   */
  deleteUser(id: number): Observable<void> {
    const url = `${environment.apiUrlBase}${USER_ENDPOINTS.deleteUserById.replace('${id}', id.toString())}`;
    const headers = new HttpHeaders().set('accept', '*/*');

    return this.http.delete<void>(url, { headers });
  }

  /**
   * Updates a user on the ReqRes API by ID.
   *
   * This method sends a PUT request to update user details.
   *
   * @param {number} id - The ID of the user to be updated.
   * @param {User} userData - The user data to update.
   * 
   * @returns {Observable<User>} An observable that emits the updated user data.
   */
  updateUser(id: number, userData: User): Observable<User> {
    const url = `${environment.apiUrlBase}${USER_ENDPOINTS.updateUserById.replace('${id}', id.toString())}`;
    const headers = new HttpHeaders().set('accept', 'application/json');
    
    return this.http.put<User>(url, userData, { headers });
  }

  /**
   * Registers a new user via the ReqRes API.
   *
   * This method sends a POST request to the registration endpoint with the required data.
   * 
   * @param {RegisterRequest} userData - The registration details of the user.
   *
   * @returns {Observable<RegisterResponse>} An observable that emits the server's response
   * with the user ID and token if the registration is successful.
   */
  registerUser(userData: RegisterRequest): Observable<RegisterResponse> {
    const url = `${environment.apiUrlBase}${USER_ENDPOINTS.registerUser}`;
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.post<RegisterResponse>(url, userData, { headers });
  }
}
