import { users } from './Data.js';

function login(user, password) {
    if (users[user] && password === users[user].password) {
        return users[user];
    }
    else {
        return false;
    }
}

function logout() {
    return false;
}

export { login, logout };