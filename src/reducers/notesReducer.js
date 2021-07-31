import { types } from "../types/types"

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = ( state=initialState, action ) =>{

    switch (action.type) {
        
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes]    // Nueva nota, notas antiguas
            }    

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdated:
            return{
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id   // Buscamos la nota cuyo id coincida con el del action que genera el updated
                    ? action.payload.note                   // Encontrada la nota establecemos su nuevo payload
                    :note                                   // Sino se deja como estaba
                )
            }; 
        
        case types.notesDelete:
            return{
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)   // De notes quitamos la note que queremos borrar (action.payload)
                                            //retornamos las notas que sean distintas del action.payload que contiene la que queremos borrar
            }    

        case types.notesLogoutCleaning:
            return{
                ...state,
                active:null,
                notes: []
            }

        default:
            return state
    }
}