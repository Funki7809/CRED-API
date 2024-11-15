export const DEFAULT_PAGINATION = {
    page: 1,
    perPage: 12
  };

export const USER_ENDPOINTS = {
    getAllUsers: 'users/?page=${page}&per_page=${perPage}',
    getUserById: 'users/${id}',
    deleteUserById: 'users/${id}',
    updateUserById: 'users/${id}'
}