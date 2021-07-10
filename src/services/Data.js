// Las cuentas son identificadas por la moneda + el número de cuenta
const users = {
    gabriela: {
        id: 'gabriela',
        password: '123456',
        name: 'Gabriela',
        surname: 'Méndez',
        accounts: [
            {
                accountNumber: '0002547698',
                currencyId: 'UYU',
                currencyDescription: 'Pesos uruguayos',
                funds: 100000
            },
            {
                accountNumber: '0002547698',
                currencyId: 'USD',
                currencyDescription: 'Dólares',
                funds: 3490
            },
            {
                accountNumber: '0002547698',
                currencyId: 'EUR',
                currencyDescription: 'Euro',
                funds: 2200
            }
        ],
        token: "TokenFicticioGabriela",
    },
    adolfo: {
        id: 'adolfo',
        password: '456789',
        name: 'Adolfo',
        surname: 'Rodríguez',
        accounts: [
            {
                accountNumber: '0002476172',
                currencyId: 'UYU',
                currencyDescription: 'Pesos uruguayos',
                funds: 70000
            },
            {
                accountNumber: '0002476172',
                currencyId: 'USD',
                currencyDescription: 'Dólares',
                funds: 5100
            },
            {
                accountNumber: '0002476172',
                currencyId: 'EUR',
                currencyDescription: 'Euro',
                funds: 1200
            }
        ],
        token: "TokenFicticioAdolfo",
    },
    patricia: {
        id: 'patricia',
        password: '789123',
        name: 'Patricia',
        surname: 'Fernández',
        accounts: [
            {
                accountNumber: '0002123659',
                currencyId: 'UYU',
                currencyDescription: 'Pesos uruguayos',
                funds: 120000
            },
            {
                accountNumber: '0002123659',
                currencyId: 'USD',
                currencyDescription: 'Dólares',
                funds: 990
            },
            {
                accountNumber: '0002123659',
                currencyId: 'EUR',
                currencyDescription: 'Euro',
                funds: 12400
            }
        ],
        token: "TokenFicticioPatricia",
    }
}

export { users };