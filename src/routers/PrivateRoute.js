import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({  // Para renderizar de forma condicional una ruta necesitaremos
    isAuthenticated,            // la función que hace de condición,
    component: Component,       // un componente a renderizar
    ...rest                     // el resto de props de una ruta (path, exact, etc)
}) => {


    return (
        <Route { ...rest }                      // Esta ruta recibirá sus props (...rest)
            component={ (props) => (            // y renderizara un componente 

                (isAuthenticated)                    // si se existe esta funcíon y da true
                ? <Component { ...props } />         // entonces se cargará el componente con sus props    
                :(<Redirect to="/auth/login" />)     // sino nos redireccionará a login

            )}

        />
                    
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}