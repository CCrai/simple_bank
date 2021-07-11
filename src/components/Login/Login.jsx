import React from 'react';
import './Login.css';
import { login } from '../../services/LoginMockService';

// Importación del contexto global
import { StateContext } from '../../context/StateProvider';

function Login() {
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');

    // Context Hook
    const { userLogged, setUserLogged } = React.useContext(StateContext);

    const validateDataAndLogin = (event) => {
        event.preventDefault();

        let isLogged = login(user, pass);
        setUserLogged(isLogged);

        if (!isLogged) {
            window.alert('El usuario o la contraseña no son válidos. Intente nuevamente.');
        }
    }

    return (
        <div className="container">
            <h2>Login</h2>
            <form className="login-container" onSubmit={validateDataAndLogin}>
                <label>Usuario</label>
                <input
                    type="text"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                ></input>

                <label>Contraseña</label>
                <input
                    type="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                ></input>
                <button>Ingresar</button>
            </form>
        </div>
    );
}

export default Login;