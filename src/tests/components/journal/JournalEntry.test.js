import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 

import '@testing-library/jest-dom';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';




const middlewares = [thunk];
const mockStore = configureStore(middlewares); // Simulamos el thunk para los dispatch

const initState = {};

let store = mockStore( initState )             // Simulamos un store que nos devuelve un auth y un ui

store.dispatch = jest.fn();                    // Los dispatch sobre el store se evaluaran sobre un afunción simulada 
       
const nota = {
    id:10,
    date:0,
    title:'Hola',
    body: 'Mundo',
    url: 'https://algunlugar.com/foto.jpg'
}

const wrapper = mount(                         // Construimos un wrapper 
    <Provider store={ store }>
                                  
        <JournalEntry { ...nota }/>
                   
    </Provider>
)

describe('Pruebas en <JournalEntry />', () => {
    
    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de activar la nota', () => {
        wrapper.find('.journal__entry').prop('onClick')(); 
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote( nota.id, { ...nota })
        );
    })
    
    
})
