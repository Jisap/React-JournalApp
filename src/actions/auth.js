import Swal from 'sweetalert2';
import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import { startLoading, finishLoading } from "./ui"
import { noteLogout } from './notes';



export const startLoginEmailPassword = (email, password) => {           // Como es una tarea asíncrona necesito retornar un callback
    return (dispatch) => {                                              // Gracias a thunk podemos hacerlo
        dispatch(startLoading())
        return firebase.auth().signInWithEmailAndPassword(email, password) // Cuando damos el email y el password firebase autentíca y 
            .then( ( {user}) => {                                       // genera un user que contiene su uid y displayName
                dispatch(
                    login(user.uid, user.displayName)
                ) 
                dispatch(finishLoading())
            })
            .catch(e => {
                console.log(e)
                dispatch(finishLoading())
                Swal.fire('Error', e.message,'error');
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password) // Firebase creará y autenticará un usuario nuevo
            .then( async ({user})  => {                                 
                await user.updateProfile({ displayName: name })         // Introduciremos la prop displayName con el name del registro                           
                dispatch(                                   
                    login(user.uid, user.displayName)                   // Hacemos el dispatch    
                )
            }).catch(e => {
                console.log(e);                                         // Gestión del posible error. 
                Swal.fire('Error', e.message,'error');
            })
    }

}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider) // Firebase autenticará un usuario en base a una cuenta de google
            .then( ({user})  => {                           // la respuesta nos dará un user y de el desestructuraremos uid y name
                dispatch(                                   // para poder desencadenar un dispatch -> action -> store
                    login(user.uid, user.displayName)
                )
            })
    }
}

export const login = (uid, displayName) => ({   // La action login recibirá un uid y un displayName
                                                // y servirá para cambiar el estado de esas props.
        type: types.login,
        payload: {
            uid,
            displayName
        }
    });

export const startLogout = () => {              
    return async(dispatch) => {                 
        await firebase.auth().signOut();        // Cuando firebase nos desloguee
        dispatch(logout())                      // se ejecutará el dispatch de la action que cambia nuestro estado como logout
        dispatch (noteLogout());                // Purgamos las notas.
    }
}

export const logout = () => ({
    type: types.logout
})

