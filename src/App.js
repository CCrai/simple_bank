import React from 'react';
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
      {userLogged ?
        <div>
          <Nav></Nav>
          <Transfers />
          <div className="accounts-container">
            {userLogged.accounts.map((account, index) => {
              return (
                <div key={index}>
                  <span>
                    {account.accountNumber + ' - ' + account.currencyDescription}
                  </span>
                  <br></br>
                  <span className="amount-account">
                    {account.currencyId + ' - ' + account.funds}
                  </span>
                </div>
              );
            })}
          </div>
        </div> : <Login />
      }
    </div>
  );
}

export default App;
