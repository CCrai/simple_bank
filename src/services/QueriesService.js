import { users } from './Data.js';

function setFunds(currency, destinationAccount, addOrSubtract, amount) {
    amount = parseFloat(amount);

    let keys = Object.keys(users);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let user = users[key];

        _searchAccountAndSetFunds(user, destinationAccount, currency, addOrSubtract, amount);
    }
}

function _searchAccountAndSetFunds(user, destinationAccount, currency, addOrSubtract, amount) {
    for (let i = 0; i < user.accounts.length; i++) {
        let currencyId = user.accounts[i].currencyId;
        let accountNumber = user.accounts[i].accountNumber;

        if (currency + destinationAccount === currencyId + accountNumber) {
            console.log('Antes', user.accounts[i].funds);
            if (addOrSubtract === '+') {
                console.log('Monto a sumar', amount);
                user.accounts[i].funds = user.accounts[i].funds + amount;
            }
            else {
                console.log('Monto a restar', amount);
                user.accounts[i].funds = user.accounts[i].funds - amount;
            }
            console.log('Después', user.accounts[i].funds);
        }
    }
}

function getUser(user) {
    return users[user];
}

export { setFunds, getUser };