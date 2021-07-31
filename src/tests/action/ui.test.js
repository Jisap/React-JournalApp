import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types";


describe('Pruebas en ui-actions', () => {
    
    test('Todas las acciones deben de funcionar ', () => {
        
        const action = setError('Error');   // Definimos el contenido del error

        expect(action).toEqual({            // Esperariamos que el action tuviese el contenido type y payload
            type:types.uiSetError,
            payload: 'Error'
        })

        const removeErrorAction = removeError();        // Definimos las actions del ui reducer
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        })
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        })
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        })
    })
    
})
