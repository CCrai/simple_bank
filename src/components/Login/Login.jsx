import React from 'react';
import './Login.css';
import { login } from '../../services/LoginMockService';

// Importación del contexto global
import { StateContext } from '../../context/StateProvider';

function Login() {
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');

    // Context Hook
    const { userIsLogged, setUserIsLogged } = React.useContext(StateContext);

    const validateDataAndLogin = (event) => {
        event.preventDefault();
        console.log(user, pass);
        let isLogged = login();
        setUserIsLogged(isLogged);
        /**
         * <ToDo>
         * Validar los datos y obtener
         * la informacion del usuario
         * utilizando el servicio mock
         * con su funcion login()
         * </ToDo>
         */
    }

    return (
        <div className="container">
            <form className="login-container" onSubmit={validateDataAndLogin}>
                <h2>Login</h2>
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