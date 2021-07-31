import { types } from "../types/types"

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {

    switch( action.type ){
        case types.uiSetError:
            return{
                ...state,                   // Solo vamos a cambiar el mensaje de error, el resto del state se mantiene igual.
                msgError: action.payload    // Este mensaje vendrá en payload que genera el error.
            }
        
        case types.uiRemoveError:
            return{
                ...state,                   // Solo vamos a cambiar el mensaje de error, el resto del state se mantiene igual.
                msgError: null              // Este mensaje quita el error por lo tanto se igual a null.
            }

        case types.uiStartLoading:
            return{
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return{
                ...state,
                loading: false
            }    
        default:
            return state;
    }
}