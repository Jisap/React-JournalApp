import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import { firebase } from '../firebase/firebaseConfig'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();                         // Definimos el dispatch para para poder usar nuestras acciones           
    const [checking, setChecking] = useState(true);         // checking es true mientras firebase esta verificando autenticación
    const [isLoggedIn, setIsLoggedIn] = useState(false);    // isLoggedIn servirá para el renderizado condicional de las rutas.

    useEffect(() => {                                       // Nada más cargar la app vamos a ver si existe un usuario autenticado
        
        firebase.auth().onAuthStateChanged(async(user)=>{   // Creamos un observable (user) sobre el estado de autenticación de un usuario
            if (user?.uid){                                 // Si el user existe y contiene un uid -> esta autenticado -> dispatch(login)
                dispatch(login(user.uid, user.displayName));// y se cambia el estado de user. 
                setIsLoggedIn(true);                        // Si el user esta logeado isloggedIn = true -> página ppal se renderiza.   
            
                dispatch( startLoadingNotes(user.uid));     // Cargamos las notas haciendo uso de la action startloading y modificamos así el store

            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);                             // Si el usuario está autenticado checking pasa a false.
        })    
    }, [dispatch,setChecking,setIsLoggedIn])                // Este useEffect se realizará una sola vez, la 1ª vez que se renderize la app. 
                                                            // Dispatch y los sets hay que incluirlas porque podrían cambiar sus valores
                                                            // pero en realidad solo se evalua una única vez. Se ponen por rec de React.

    if(checking) {                                          // Mientras comprobamos si existe un usuario autenticado ponemos un cartel de espera.
        return(
            <h1>Espere..</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute
                        exact 
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={ isLoggedIn }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
