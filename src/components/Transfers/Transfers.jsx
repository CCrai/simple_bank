import React from 'react';
import './Transfers.css';
import { convertAmount, arbitrationUsd, arbitrationEur, cotization } from '../../services/ArbitrationService';
import { setFunds, getUser, searchAccount, searchAccountOwner } from '../../services/QueriesService';

// Importación del contexto global
import { StateContext } from '../../context/StateProvider';

function Transfers(props) {
	// Context Hook
	const { userLogged, setUserLogged } = React.useContext(StateContext);

	const [ rootAccount, setRootAccount ] = React.useState('');
	const [ destinationAccount, setDestinationAccount ] = React.useState('');
	const [ currency, setCurrency ] = React.useState('UYU');
	const [ amount, setAmount ] = React.useState(0);
	const [ reference, setReference ] = React.useState('');
	const [ confirm, setConfirm ] = React.useState(false);
	const [ transferComplete, setTransferComplete ] = React.useState(false);

	const validateDataAndGoToNextStep = (event) => {
		event.preventDefault();

		if (rootAccount === '') {
			window.alert('No has elegido la cuenta origen.');
			return;
		}

		if (destinationAccount === '') {
			window.alert('No has elegido la cuenta destino.');
			return;
		}

		if (destinationAccount < 0) {
			window.alert('Número de cuenta incorrecto.');
			return;
		}

		if (amount < 1) {
			window.alert('El importe a transferir no puede ser 0 ni negativo.');
			return;
		}

		if (reference === '') {
			window.alert('Es necesario ingresar una referencia.');
			return;
		}

		let ownerDestinationAccount = searchAccountOwner(currency, destinationAccount);
		console.log(userLogged, ownerDestinationAccount);
		if (userLogged.id === ownerDestinationAccount.user.id) {
			window.alert('No está permitido realizar transacciones entre tus cuentas. Sólo puedes hacerlo a cuentas de terceros.');
			return;
		}

		setConfirm(true);
	};

	const sendTransfer = () => {
		let auxDestinationAccount = searchAccount(currency, destinationAccount);

		if (auxDestinationAccount) {
			let rootCurrency = rootAccount.split('-')[0];
			let account = rootAccount.split('-')[1];

			let auxRootAccount = searchAccount(rootCurrency, account);
			// Restamos el importe de la cuenta origen
			let success = setFunds(auxRootAccount, '-', amount);

			if (success) {
				let amountToTransfer = convertAmount(rootAccount, currency, amount);
				setFunds(auxDestinationAccount, '+', amountToTransfer);

				let updatedUser = JSON.parse(JSON.stringify(getUser(userLogged.id)));
				setUserLogged(updatedUser);

				setTransferComplete(true);
			} else {
				window.alert('No tienes fondos suficientes para realizar esta transferencia');
			}
		} else {
			window.alert('La cuenta ingresada no existe');
		}
	};

	const refreshDataAndBackToTransfer = () => {
		setRootAccount('');
		setDestinationAccount('');
		setCurrency('UYU');
		setAmount(0);
		setReference('');
		setConfirm(false);
		setTransferComplete(false);
	};

	const showCotizationOrArbitration = () => {
		if (rootAccount.split('-')[0] === currency) {
			return '';
		}

		let transferWithUsdAndUyu =
			(rootAccount.split('-')[0] === 'UYU' && currency === 'USD') ||
			(rootAccount.split('-')[0] === 'USD' && currency === 'UYU');
		if (transferWithUsdAndUyu) {
			return 'Cotización: UYU ' + cotization.USD;
		}

		let transferWithEurAndUyu =
			(rootAccount.split('-')[0] === 'UYU' && currency === 'EUR') ||
			(rootAccount.split('-')[0] === 'EUR' && currency === 'UYU');
		if (transferWithEurAndUyu) {
			return 'Cotización: UYU ' + cotization.EUR;
		}

		let transferFromUsdToEur = rootAccount.split('-')[0] === 'USD' && currency === 'EUR';
		if (transferFromUsdToEur) {
			return 'Arbitraje: ' + arbitrationUsd.USD + ' USD = ' + arbitrationUsd.EUR + ' EUR';
		}

		let transferFromEurToUsd = rootAccount.split('-')[0] === 'EUR' && currency === 'USD';
		if (transferFromEurToUsd) {
			return 'Arbitraje: ' + arbitrationEur.EUR + ' EUR = ' + arbitrationEur.USD + ' USD';
		}
	};

	return (
		<div className="container">
			<h2>Transferencias bancarias</h2>

			{transferComplete ? (
				<div className="transfers-container">
					<h3>Comprobante de la transacción</h3>
					<p>La transferencia se ha realizado con éxito. Gracias por confiar en Bank.</p>
					<label>Cuenta de origen</label>
					<h4>{rootAccount}</h4>
					<label>Cuenta destino</label>
					<h4>{currency + '-' + destinationAccount}</h4>
					<label>Monto transferido</label>
					<h4>{rootAccount.split('-')[0] + ' - ' + amount}</h4>
					<label>Referencia del movimiento</label>
					<h4>{reference}</h4>
					<button onClick={refreshDataAndBackToTransfer}>Realizar otra transferencia</button>
				</div>
			) : (
				<form className="transfers-container" onSubmit={validateDataAndGoToNextStep}>
					<label>Cuenta de origen</label>
					<select onChange={(e) => setRootAccount(e.target.value)} disabled={confirm}>
						<option value="">Seleccione una cuenta</option>
						{userLogged.accounts.map((account) => {
							return (
								<option
									value={account.currencyId + '-' + account.accountNumber}
									key={account.currencyId + '-' + account.accountNumber}
								>
									{account.accountNumber + ' - ' + account.currencyDescription}
								</option>
							);
						})}
					</select>

					<label>Cuenta destino</label>
					<input
						type="number"
						onChange={(e) => setDestinationAccount(e.target.value)}
						value={destinationAccount}
						disabled={confirm}
					/>

					<div className="radio-button-container">
						<input
							type="radio"
							id="UYU"
							name="drone"
							value="UYU"
							checked={currency === 'UYU'}
							onChange={(e) => setCurrency(e.target.value)}
							disabled={confirm}
						/>
						<label htmlFor="UYU">Pesos Uruguayos</label>

						<input
							type="radio"
							id="USD"
							name="drone"
							value="USD"
							checked={currency === 'USD'}
							onChange={(e) => setCurrency(e.target.value)}
							disabled={confirm}
						/>
						<label htmlFor="USD">Dólares</label>

						<input
							type="radio"
							id="EUR"
							name="drone"
							value="EUR"
							checked={currency === 'EUR'}
							onChange={(e) => setCurrency(e.target.value)}
							disabled={confirm}
						/>
						<label htmlFor="EUR">Euros</label>
					</div>

					<label>{'Monto a transferir en ' + rootAccount.split('-')[0]}</label>
					<div>
						<input
							type="number"
							onChange={(e) => setAmount(e.target.value)}
							value={amount}
							disabled={confirm}
						/>
					</div>
					<span className="amount-and-arbitration-span">La cuenta destino recibirá:</span>
					<span className="amount-and-arbitration-span">
						{currency + ' ' + convertAmount(rootAccount, currency, amount)}
					</span>
					<span className="amount-and-arbitration-span">{showCotizationOrArbitration()}</span>

					<label>Referencia del movimiento</label>
					<textarea
						onChange={(e) => setReference(e.target.value)}
						value={reference}
						disabled={confirm}
						maxLength="255"
					/>

					{confirm ? (
						<div className="buttons-transfers-container">
							<button onClick={() => setConfirm(false)}>Atrás</button>
							<button onClick={sendTransfer}>Confirmar</button>
						</div>
					) : (
						<button>Enviar transferencia</button>
					)}
				</form>
			)}
		</div>
	);
}

export default Transfers;
