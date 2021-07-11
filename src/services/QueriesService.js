import { users } from './Data.js';

function searchAccount(currency, destinationAccount) {
    let keys = Object.keys(users);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let user = users[key];

        let account = _searchAccountInUsers(user, destinationAccount, currency);
        if (account) {
            return account;
        }
    }

    return false;
}

function _searchAccountInUsers(user, destinationAccount, currency) {
    for (let i = 0; i < user.accounts.length; i++) {
        let currencyId = user.accounts[i].currencyId;
        let accountNumber = user.accounts[i].accountNumber;

        if (currency + destinationAccount === currencyId + accountNumber) {
            return user.accounts[i];
        }
    }

    return false;
}

function setFunds(destinationAccount, addOrSubtract, amount) {
    if (addOrSubtract === '+') {
        destinationAccount.funds = destinationAccount.funds + amount;
        return true;
    }
    else {
        if (amount > destinationAccount.funds) {
            return false;
        }
        else {
            destinationAccount.funds = destinationAccount.funds - amount;
            return true;
        }
    }
}

function getUser(user) {
    return users[user];
}

export { setFunds, getUser, searchAccount };