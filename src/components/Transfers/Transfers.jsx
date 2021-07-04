import React from 'react';
import './Transfers.css';
import { logout } from '../../services/LoginMockService';

// Importación del contexto global
import { StateContext } from '../../context/StateProvider';

function Transfers(props) {
    const [rootAccount, setRootAccount] = React.useState('');
    const [destinationAccount, setDestinationAccount] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [reference, setReference] = React.useState('');

    // Context Hook
    const { userIsLogged, setUserIsLogged } = React.useContext(StateContext);

    const logoutToMain = () => {
        let isLogged = logout();
        setUserIsLogged(isLogged);
    }

    return (
        <div className="container">
            <form className="transfers-container">
                <h2>Transferencias bancarias</h2>
                <label>Cuenta de origen</label>
                <select
                    onChange={(e) => setRootAccount(e.target.value)}
                    value={rootAccount}
                >
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <label>Cuenta destino</label>
                <input
                    type="text"
                    onChange={(e) => setDestinationAccount(e.target.value)}
                    value={destinationAccount}
                ></input>
                <label>Monto a transferir</label>
                <input
                    type="textarea"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                ></input>
                <label>Monto a transferir</label>
                <textarea
                    onChange={(e) => setReference(e.target.value)}
                    value={reference}
                ></textarea>
                <button>Ingresar</button>
            </form>
            <button
                className="logout-button"
                onClick={logoutToMain}
            >Logout</button>
        </div>
    );
}

export default Transfers;