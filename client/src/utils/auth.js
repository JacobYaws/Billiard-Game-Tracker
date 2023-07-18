// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // Checks to see if the user is logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Checks to see if the token is expired. If so, the user will be logged out.
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves the user token into localstorage to keep the user logged in.
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Removes the user token upon loggin out.
    localStorage.removeItem('id_token');
    // reloads the page to the '/' endpoint. 
    window.location.assign('/');
  }
};

export default new AuthService();