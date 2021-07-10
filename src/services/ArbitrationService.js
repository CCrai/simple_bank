const arbitration = {
    UYU: 1,
    USD: 44,
    EUR: 52,
}

function convertAmount(rootAccount, destinationCurrency, amount) {
    let rootCurrency = rootAccount.split('-')[0];

    if (rootCurrency === destinationCurrency) {
        return amount;
    }

    if (rootCurrency === 'UYU') {
        return amount / arbitration[destinationCurrency];
    }

    let amountInUyu = amount * arbitration[rootCurrency];
    return amountInUyu / arbitration[destinationCurrency];
}

export { convertAmount };