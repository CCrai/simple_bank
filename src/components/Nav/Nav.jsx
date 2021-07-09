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
		<button className="logout-button" onClick={logoutToMain}>
			Logout
		</button>
	);
}

export default Login;
