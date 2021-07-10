import React from 'react';
import './Transfers.css';
import { convertAmount } from '../../services/ArbitrationService';
import { setFunds } from '../../services/QueriesService';

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

	const sendTransfer = (event) => {
        let rootCurrency = rootAccount.split('-')[0];
        let account = rootAccount.split('-')[1];
        setFunds(rootCurrency, account, '-', amount);

		let amountToTransfer = convertAmount(rootAccount, currency, amount);
        setFunds(currency, destinationAccount, '+', amountToTransfer);
	};

	const validateDataAndGoToNextStep = (event) => {
		event.preventDefault();

		if (rootAccount === '' || destinationAccount === '' || amount < 1 || reference === '') {
			window.alert('Te han quedado algunos datos sin llenar o incorrectos. Revísalos y vuelve a intentar.');
		} else {
			setConfirm(true);
		}
	};

	return (
		<div className="container">
			<h2>Transferencias bancarias</h2>
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

				<label>Monto a transferir</label>
				<input type="number" onChange={(e) => setAmount(e.target.value)} value={amount} disabled={confirm} />

				<label>Referencia del movimiento</label>
				<textarea
					onChange={(e) => setReference(e.target.value)}
					value={reference}
					disabled={confirm}
					maxLength="255"
				/>

				{confirm ? (
					<div>
						<button onClick={() => setConfirm(false)}>Atrás</button>
						<button onClick={sendTransfer}>Confirmar transferencia</button>
					</div>
				) : (
					<button>Enviar transferencia</button>
				)}
			</form>
		</div>
	);
}

export default Transfers;
