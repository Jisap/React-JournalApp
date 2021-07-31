/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 
import { starNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';


jest.mock('../../helpers/fileUpload', () => {       // Simulamos la subida de un archivo con fileUplaod
    return {
        fileUpload:() => {
            return Promise.resolve(
                'http://hola-mundo/cosa.jpg'        // cuyo rdo final es una url
            )
        }
    }
})

//npm install redux-mock-store --save-dev

const middlewares = [thunk];
const mockStore = configureStore(middlewares); // Simulamos el thunk para los dispatch

const initState = {
    auth:{
        uid:'TESTING'
    },
    notes:{
        active:{
            id: 'Xr1fno2Ja4H03J8TE6VH',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore( initState )     // Simulamos un store que nos devuelve un uid
    
global.scrollTo = jest.fn();           // Simulamos el posible scroll 

describe('Pruebas con las acciones de notes', () => {

    beforeEach(()=>{
        store = mockStore( initState ); // reinicializamos el store en cada prueba
    })
    
    test('Debe de crear una nueva note startNewNote', async() => {
        
        await store.dispatch(starNewNote());    // Disparamos el starNewNote

        const actions = store.getActions(); // Obtenemos las actions que dispara asu vez el starNewNote
        //console.log(actions);             // Que es un array de action [activeNote, addNewNote]

        expect(actions[0]).toEqual({        // Esperariamos que se activara una nota
            type:types.notesActive,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)    
            }
        })

        expect(actions[1]).toEqual({        // Y que esa nota activada se añadiera al array de notas.
            type:types.notesAddNew,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete(); // Despues borramos la nota para no llenar de basura FB

    })
    
    test('starLoadingNotes debe cargar las notas', async() => {
                                              // UID
        await store.dispatch(startLoadingNotes('TESTING'));         // Disparamos el dispathc de starLoadingNotes

        const actions = store.getActions();                         // Capturamos las action
        
        expect(actions[0]).toEqual({                                // Esperariamos que la 1ª qaction tuviese el tipo notesLoad
            type: types.notesLoad,
            payload: expect.any(Array)                              // con un payload igual a un array cualquiera
        })

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)                                // Construimos un payload esperado
        }
        expect(actions[0].payload[0]).toMatchObject(expected)       // Esperariamos que el payload de la action fuese del tipo construido
    })
    
    test('startSaveNote debe guardar/actualizar los cambios en la nota', async() => {
        
        const note = {
            id:'Xr1fno2Ja4H03J8TE6VH',
            title: 'titulo',
            body: 'body'                                                            // Construimos la nota a actualizar
        }
        await store.dispatch(startSaveNote(note));                                  // Disparamos el dispatch de starSaveNote
 
        const actions = store.getActions();                                         // Capturamos las actions
        expect(actions[0].type).toBe(types.notesUpdated);                           // Esperariamos que el tipo de la accion 1ª fuese notesUpdated
 
        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();     // REcuperamos la nota del fb
        expect(docRef.data().title).toBe(note.title);                               // Esperariamos que el título de fb coincida con el de la actualización
    })
})

test('startUploading debe de actualizar el url del entry', async() => {
    
    const file = []//= new File([], 'foto.jpg');      // Simulamos un archivo (vacio)
    await store.dispatch(startUploading(file)); // Disparamos el dispatch de startUploading con ese archivo

    const docRef = await db.doc(`/TESTING/journal/notes/Xr1fno2Ja4H03J8TE6VH`).get();   // Obtenemos la ref al documento

    expect(docRef.data().url).toBe('http://hola-mundo/cosa.jpg'); // Esperariamos que el doc tuviera la prop url con el contenido
})
