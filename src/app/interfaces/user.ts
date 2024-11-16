export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    password?: string;
  }
  
  interface Support {
    url: string;
    text: string;
  }
  
  export interface UsersResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: Support;
  }

  export interface OneUser {
    data: User;
    support: Support;
  }

  export interface RegisterRequest {
    username: string;
    email: string;
    password?: string;
  }
  
  export interface RegisterResponse {
    id: string;
    token: string;
  }