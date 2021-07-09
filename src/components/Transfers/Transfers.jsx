import React from 'react';
import './Transfers.css';

// Importación del contexto global
import { StateContext } from '../../context/StateProvider';

function Transfers(props) {
	const [ rootAccount, setRootAccount ] = React.useState('');
	const [ destinationAccount, setDestinationAccount ] = React.useState('');
	const [ currency, setCurrency ] = React.useState('UYU');
	const [ amount, setAmount ] = React.useState(0);
	const [ reference, setReference ] = React.useState('');

	// Context Hook
	const { userLogged, setUserLogged } = React.useContext(StateContext);

	const validateDataAndSendTransfer = (event) => {
		event.preventDefault();
	};

	const pruCC = (event) => {
		console.log(event);
        return true;
	};

	return (
		<div className="container">
			<h2>Transferencias bancarias</h2>
			<form className="transfers-container" onSubmit={validateDataAndSendTransfer}>
				<label>Cuenta de origen</label>
				<select onChange={(e) => setRootAccount(e.target.value)}>
					{userLogged.accounts.map((account) => {
						return (
							<option
								value={account.accountNumber + account.currencyId}
								key={account.accountNumber + account.currencyId}
							>
								{account.accountNumber + ' - ' + account.currencyDescription}
							</option>
						);
					})}
				</select>

				<label>Cuenta destino</label>
				<input type="number" onChange={(e) => setDestinationAccount(e.target.value)} value={destinationAccount} />

				<div className="radio-button-container">
					<input type="radio" id="UYU" name="drone" value="UYU" checked={currency === 'UYU'} onChange={(e) => setCurrency(e.target.value)} />
					<label htmlFor="UYU">Pesos Uruguayos</label>

					<input type="radio" id="USD" name="drone" value="USD" checked={currency === 'USD'} onChange={(e) => setCurrency(e.target.value)}/>
					<label htmlFor="USD">Dólares</label>

					<input type="radio" id="EUR" name="drone" value="EUR" checked={currency === 'EUR'} onChange={(e) => setCurrency(e.target.value)}/>
					<label htmlFor="EUR">Euros</label>
				</div>

				<label>Monto a transferir</label>
				<input type="number" onChange={(e) => setAmount(e.target.value)} value={amount} />

				<label>Referencia del movimiento</label>
				<textarea onChange={(e) => setReference(e.target.value)} value={reference} />
				<button>Enviar transferencia</button>
			</form>
		</div>
	);
}

export default Transfers;
