import React from 'react';

export const StateContext = React.createContext();

const StateProvider = (props) => {
    const [userLogged, setUserLogged] = React.useState(false);

    return (
        <StateContext.Provider value={{
            userLogged, setUserLogged,
        }}>
            {props.children}
        </StateContext.Provider>
    )
}

export default StateProvider
