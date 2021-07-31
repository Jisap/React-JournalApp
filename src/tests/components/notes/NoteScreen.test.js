import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Permite simular las rutas como si estuvieramos dentro de un router

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 

import '@testing-library/jest-dom';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () =>({      // Simulamos la action startNewNote
    activeNote: jest.fn(),
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
        active: {
            id: 1234,
            title: 'Hola',
            body: 'mundo',
            date: 0
        },
        notes: [],
    }
};

let store = mockStore( initState )             // Simulamos un store que nos devuelve un auth y un ui

store.dispatch = jest.fn();                    // Los dispatch sobre el store se evaluaran sobre un afunción simulada 
              
const wrapper = mount(                         // Construimos un wrapper 
    <Provider store={ store }>
                                  
        <NoteScreen />
                   
    </Provider>
)

describe('Pruebas en el <NoteScreen />', () => {
    
    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('debe de disparar el active note', () => {

        wrapper.find('input[name="title"]').simulate('change', {    // Simulamos el cambio en la caja de texto
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });
        
        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'mundo',
                title: 'Hola de nuevo',
                id: 1234,
                date: 0
            }
        )
    })
    
})
