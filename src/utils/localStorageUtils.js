const USERS_KEY = 'users';
const LOGGED_IN_USER_KEY = 'loggedInUser';


export const getUsersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};


export const saveUsersToLocalStorage = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};


export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY));
};


export const saveLoggedInUser = (user) => {
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
};


export const clearLoggedInUser = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
};
