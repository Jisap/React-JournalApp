import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk'; //Redux-thunk te permite escribir creadores de acciones que retornan una función en vez de un objeto de acción 
                                 //típico. Entonces, el thunk puede ser usado para retrasar el envío de una acción hasta que se cumpla una línea 
                                 //de código asíncrona.
import { uiReducer } from '../reducers/uiReducers';
import { notesReducer } from '../reducers/notesReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//Si el código se está ejecutando en un entorno de navegador -> usa las redux_devtools y o continua con el siguente midleware


const reducers = combineReducers({              // reducers contiene la estructura de mi estado
    auth: authReducer,                          // en general y cada uno de los elementos vendrá dado por su reducer
    ui: uiReducer,
    notes: notesReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(                           // composeEnhancers permite aplicar al store diferentes midlewares
        applyMiddleware(thunk)                  // thunk permite retrasar la action hasta que halla respuesta de firebase
    ));