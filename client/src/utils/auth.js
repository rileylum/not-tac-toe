import decode from 'jwt-decode';

class AuthService {
    // get user data from stored token
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        // Check if there is a token and that it is stil valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }
    // handle storage of token in localStorage when user logs in or out
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/')
    }
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
};

export default new AuthService();