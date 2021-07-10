import React from 'react';
import './Nav.css';
import { logout } from '../../services/LoginMockService';

// Importación del contexto global
import { StateContext } from '../../context/StateProvider';

function Login() {
	// Context Hook
	const { userLogged, setUserLogged } = React.useContext(StateContext);

	const logoutToMain = () => {
		let isLogged = logout();
		setUserLogged(isLogged);
	};

	return (
		<div className="nav-container">
			<div className="nav">
				<span>{'Bienvenido ' + userLogged.name}</span>
				<h1>Bank</h1>
				<button className="logout-button" onClick={logoutToMain}>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Login;
