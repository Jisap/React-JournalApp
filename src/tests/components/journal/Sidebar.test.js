import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Permite simular las rutas como si estuvieramos dentro de un router

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 

import '@testing-library/jest-dom';
import { startLogout } from '../../../actions/auth';
import { starNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';

jest.mock('../../../actions/auth', () =>({      // Simulamos la action startLogout
    startLogout: jest.fn(),
}));
jest.mock('../../../actions/notes', () =>({      // Simulamos la action startNewNote
    starNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares); // Simulamos el thunk para los dispatch

const initState = {
    auth:{
        uid: '1',
        name: 'Fernando'
    },
    ui:{
        loading:false,
        msgError:null
    },
    notes: {
        active: null,
        notes: [],
    }
};

let store = mockStore( initState )             // Simulamos un store que nos devuelve un auth y un ui

store.dispatch = jest.fn();                    // Los dispatch sobre el store se evaluaran sobre un afunción simulada 
              
const wrapper = mount(                         // Construimos un wrapper 
    <Provider store={ store }>
                                  
        <Sidebar />
                   
    </Provider>
)

describe('Pruebas en <Sidebar />', () => {
    
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })
    

    test('debe de llamar el startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    })

    test('debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(starNewNote).toHaveBeenCalled();
    })

    
})
