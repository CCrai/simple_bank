const cotization = {
    UYU: 1,
    USD: 44,
    EUR: 52,
}

const arbitrationUsd = {
    USD: 1,
    EUR: 1.18,
}

const arbitrationEur = {
    EUR: 1,
    USD: 0.84,
}

function convertAmount(rootAccount, destinationCurrency, amount) {
    let rootCurrency = rootAccount.split('-')[0];

    // Manejo de cuentas en Pesos Uruguayos (UYU)
    if (rootCurrency === 'UYU' || destinationCurrency === 'UYU') {
        if (rootCurrency === destinationCurrency) {
            return amount;
        }
        
        if (rootCurrency === 'UYU') {
            return amount / cotization[rootCurrency];
        }
        
        return amount * cotization[rootCurrency];
    }

    // Manejo de cuentas en Dólares USD o Euros EUR
    if (rootCurrency === destinationCurrency) {
        return amount;
    }

    // Caso desde cuenta USD a EUR
    if (rootCurrency === 'USD') {
        return amount * arbitrationEur['USD'];
    }

    // Caso desde cuenta EUR a USD
    return amount * arbitrationUsd['EUR'];
}

export { convertAmount, cotization, arbitrationUsd, arbitrationEur };