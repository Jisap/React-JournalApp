
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Permite simular las rutas como si estuvieramos dentro de un router

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 

import '@testing-library/jest-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';



// jest.mock('../../../actions/auth', () =>({      // Simulamos la action startGoogleLogin
//     startGoogleLogin: jest.fn(),                // y la startLoginEmailPassword
//     startLoginEmailPassword: jest.fn(),
// }))

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

//store.dispatch = jest.fn();                  // Los dispatch sobre el store se evaluaran sobre un afunción simulada 
                                               // Aquí no es necesario porque se trata con acciones síncronas. 
const wrapper = mount(                         // Construimos un wrapper 
        <Provider store={ store }>
            <MemoryRouter>              
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
    )

describe('Pruebas en RegisterScreen', () => {
    
    test('debe mostrarse correctamente', () => { 
        expect(wrapper).toMatchSnapshot();
    })
    
    test('debe de hacer el dispatch de la accion respectiva', () => {
        
        const emailField = wrapper.find('input[name="email"]'); // Seleccionamos el input del email por el name del mismo
        emailField.simulate('change', {                         // Simulamos que dejamos vacio el campo del email
            target:{
                value:'',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit',{                // Disparamos el submit del formulario
            preventDefault(){}
        });

        const actions = store.getActions();                     // Disparamos la actions -> establece el tipo de error
        
        expect(actions[0]).toEqual({
            type:types.uiSetError,
            payload: 'Email is required'                        // Esperariamos que este fuera el mensaje del error
        });
    })

    test('debe de mostrar la caja de alerta con el error', () => {
       
        const initState = {
            auth:{},
            ui:{
                loading:false,
                msgError: 'Email no es correcto'         // Simulamos un error
            }
        };

        const store = mockStore( initState )             // Simulamos un store que nos devuelve un auth y un ui
 
        const wrapper = mount(                           // Construimos un wrapper 
            <Provider store={ store }>
                <MemoryRouter>              
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError)
    })
    
})
