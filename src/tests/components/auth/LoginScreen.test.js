
//npm install --save-dev --save-exact jsdom jsdom-global
//import 'jsdom-global/register';

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Permite simular las rutas como si estuvieramos dentro de un router

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 

import '@testing-library/jest-dom';

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () =>({      // Simulamos la action startGoogleLogin
    startGoogleLogin: jest.fn(),                // y la startLoginEmailPassword
    startLoginEmailPassword: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares); // Simulamos el thunk para los dispatch

const initState = {
    auth:{},
    ui:{
        loading:false,
        msgError:null
    }
};

let store = mockStore( initState )             // Simulamos un store que nos devuelve un auth y un ui

store.dispatch = jest.fn();                    // Los dispatch sobre el store se evaluaran sobre un afunción simulada 
                
const wrapper = mount(                         // Construimos un wrapper 
        <Provider store={ store }>
            <MemoryRouter>              
                <LoginScreen/>
            </MemoryRouter>
        </Provider>
    )

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(() => {
        store = mockStore(initState);   // Cada vez que haga una prueba reinicializamos el store.
    })
    
    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('debe de disparar la acción de startGoogleLogin', () => {
        
        wrapper.find('.google-btn').prop('onClick')();  // Simulamos un click en el div de google
        expect(startGoogleLogin).toHaveBeenCalled();    // Esperariamos que starGoogleLogin  halla sido llamada.
        
    })

    test('debe de disparar el starlogin con los respectivos argumentos', () => {
      
        wrapper.find('form').prop('onSubmit')(
            {preventDefault(){}}
        )
        expect(startLoginEmailPassword).toHaveBeenCalledWith('nando@gmail.com','123456')
    })
    
});






