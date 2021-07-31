import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";


describe('Pruebas en el authReducer', () => {

    test('Debe de realizar el login', () => {
        
        const initState = {};                       // Construimos las variables del reducer
        const action = {
            type:types.login,
            payload: {
                uid: 'abc',
                displayName: 'Fernando'
            }
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({                             
            uid:'abc',
            name:'Fernando'
        })
    })
    
    test('Debe de realizar el logout', () => {
        
        const initState = {
            uid:'aksjdfhskj12321387',
            name:'Paco'
        };

        const action = {
            type:types.logout
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({})
    })

    test('No debe realizar cambios en el state', () => {
        
        const initState = {
            uid:'aksjdfhskj12321387',
            name:'Paco'
        };

        const action = {
            type:'skdjfhsfk'    // Type desconocido
        };

        const state = authReducer(initState, action);

        expect(state).toEqual(initState)
    })
})
