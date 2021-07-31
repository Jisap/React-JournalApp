import { useState } from "react"


export const useForm = ( initialState={}) => {              // CustomHook
    
    const [values, setvalues] = useState(initialState);     // Estado para los valores del formulario

    const reset = () => {                                   // Función para resetear los valores del formulario
        setvalues(initialState);
    }

                                //e
    const handleInputChange = ({target}) => {               // Recibe el evento del cambio "e"
                                                            
        //e --> Desestructuramos y sacamos target
        //console.log(target.name);
        //console.log(target.value);

        setvalues({                                         //Establece el nuevo valor del values
            ...values, [target.name]: target.value          //Este nuevo valor se compondrá de todos los elementos que ya tenia 
        });                                                 //y este nuevo valor del input        
        
    }

    return [values, handleInputChange,reset];               // Retornamos los valores del formulario y la función que cambia 
}                                                           // los valores en un array
