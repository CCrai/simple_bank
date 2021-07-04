const users = {
    antonio: {
        password: '123456',
        name: 'Antonio',
        surname: 'Méndez',
        accounts: [
            {
                accountNumber: '0002547698',
                currency: 'Pesos uruguayos',
                funds: 100000
            },
            {
                accountNumber: '0002547698',
                currency: 'Dólares',
                funds: 3490
            },
            {
                accountNumber: '0002547698',
                currency: 'Euro',
                funds: 2200
            }
        ],
    },
    adolfo: {
        password: '456789',
        name: 'Adolfo',
        surname: 'Rodríguez',
        accounts: [
            {
                accountNumber: '0002476172',
                currency: 'Pesos uruguayos',
                funds: 70000
            },
            {
                accountNumber: '0002476172',
                currency: 'Dólares',
                funds: 5100
            },
            {
                accountNumber: '0002476172',
                currency: 'Euro',
                funds: 1200
            }
        ],
    },
    pedro: {
        password: '789123',
        name: 'Pedro',
        surname: 'Fernández',
        accounts: [
            {
                accountNumber: '0002123659',
                currency: 'Pesos uruguayos',
                funds: 120000
            },
            {
                accountNumber: '0002123659',
                currency: 'Dólares',
                funds: 990
            },
            {
                accountNumber: '0002123659',
                currency: 'Euro',
                funds: 12400
            }
        ],
    }
}

function login() {
    console.log(users.claudio);
    return true;
    /**
     * <ToDo>
     * Validar usuario utilizando
     * el Token y devolver los
     * datos de dicho usuario
     * </ToDo>
     */
}

function logout() {
    return false;
}

export { login, logout };