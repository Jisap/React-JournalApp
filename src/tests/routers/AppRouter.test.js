import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Permite simular las rutas como si estuvieramos dentro de un router

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 

import '@testing-library/jest-dom';
import { firebase } from '../../firebase/firebaseConfig'

import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';

// import Swal from 'sweetalert2';

// jest.mock('sweetalert2', () =>({            // Simulamos sweetalert
//     fire: jest.fn(),
// }));

jest.mock('../../actions/auth', () =>({      // Simulamos la action login
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares); // Simulamos el thunk para los dispatch

const initState = {
    auth:{},
    ui:{
        loading:false,
        msgError:null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: [],
    }
};

let store = mockStore( initState )             // Simulamos un store que nos devuelve un auth y un ui

store.dispatch = jest.fn();                    // Los dispatch sobre el store se evaluaran sobre un afunción simulada 
                


describe('Pruebas en <AppRouter />', () => {
    
    test('debe de llamar el login si estoy autenticado ', async() => {
       
        let user;

        await act( async() => {                            // Asegura de que todas las actualizaciones relacionadas con estas "unidades" se hayan 
                                                           // procesado y aplicado al DOM antes de hacer cualquier afirmación. 
            
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456'); // Autenticamos en la bd de pruebas
            user = userCred.user;

            const wrapper = mount(                         // Construimos un wrapper 
                <Provider store={ store }>
                    <MemoryRouter>              
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        });

        expect( login ).toHaveBeenCalledWith('d7pGxzausXcf4BUw9cAO1r2yGdz1',null); // Esperariamos que el action login halla sido llamado
                                                                                   // con el id del usuario autenticado.




    })
    
})
