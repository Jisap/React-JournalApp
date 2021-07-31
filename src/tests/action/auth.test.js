/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 

import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

//npm install redux-mock-store --save-dev

const middlewares = [thunk];
const mockStore = configureStore(middlewares); // Simulamos el thunk para los dispatch

const initState = {};
let store = mockStore( initState )     // Simulamos un store que nos devuelve un uid
global.scrollTo = jest.fn();           // Simulamos el posible scroll

describe('Pruebas con las acciones de Auth', () => {
    
    beforeEach(() => {
        store = mockStore(initState);   // Cada vez que haga una prueba reinicializamos el store.
    })

    test('login y logout deben de crear la acción respectiva', () => {
        
        const uid = 'ABC123';
        const displayName = 'Fernando';

        const loginAction = login( uid, displayName );
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload:{
                uid,
                displayName
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });
    })
    
    test('debe de realizar el logout ', async() => {
        
        await store.dispatch(startLogout());    // Disparamos starLogoue
        const actions = store.getActions();     // Capturamos las actions

        expect(actions[0]).toEqual({
            type:types.logout
        });

        expect(actions[1]).toEqual({
            type:types.notesLogoutCleaning
        })
    })
    
    test('debe de iniciar el startLoginEmailPassword', async() => {
        
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );
        const actions = store.getActions();
        console.log(actions);

        expect(actions[1]).toEqual({
           type: types.login,
           payload:{
               uid: 'd7pGxzausXcf4BUw9cAO1r2yGdz1',
               displayName: null
           }
        })
    })
    
});
