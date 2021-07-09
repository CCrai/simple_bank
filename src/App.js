import React from 'react';
// ToDo: Cambiar por otro Favicon
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import Transfers from './components/Transfers/Transfers';

// Importación del contexto global
import { StateContext } from './context/StateProvider';

function App() {
  const { userLogged, setUserLogged } = React.useContext(StateContext);

  return (
    <div className="App">
      <Nav></Nav>
      {userLogged ?
        <Transfers /> : <Login />
      }
    </div>
  );
}

export default App;
