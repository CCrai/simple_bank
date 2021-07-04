import React from 'react';

export const StateContext = React.createContext();

const StateProvider = (props) => {
    const [userIsLogged, setUserIsLogged] = React.useState(false);

    return (
        <StateContext.Provider value={{
            userIsLogged, setUserIsLogged,
        }}>
            {props.children}
        </StateContext.Provider>
    )
}

export default StateProvider
