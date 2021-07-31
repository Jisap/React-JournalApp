import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({   // Para renderizar de forma condicional una ruta necesitaremos
    isAuthenticated,            // la función que hace de condición,
    component: Component,       // un componente a renderizar
    ...rest                     // el resto de props de una ruta (path, exact, etc)
}) => {



    return (
        <Route { ...rest }                      // Esta ruta recibirá sus props (...rest)
            component={ (props) => (            // y renderizara un componente  (loginScreen)

                (isAuthenticated)               // si esta autenticado
                ? (<Redirect to="/" />)         // entonces nos redirecciona a lo que si se puede ver    
                : <Component { ...props } />    // sino no se montará el componente de esta ruta considerada pública

            )}

        />
         // Aquí la renderización condicional del loginScreen se producirá si no hay autenticación
         // pues es la primera vez que se entra en nuestro sistema de rutas.           
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}