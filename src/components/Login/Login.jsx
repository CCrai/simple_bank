import React from 'react';

function Login(props) {
	const [ user, setUser ] = React.useState('');
	const [ pass, setPass ] = React.useState('');

	return (
		<div className="login-container">
			<h2>Login</h2>
            <label>Usuario</label>
            <input type="text"></input>
            <label>Contraseña</label>
            <input type="password"></input>
		</div>
	);
}

export default Login;