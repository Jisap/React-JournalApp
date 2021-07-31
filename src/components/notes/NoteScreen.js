import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();                             // UseSelector se ejecuta cada vez que envia una acción y se modifica el store

    const { active:note } = useSelector (state => state.notes); // Miramos el estado de las notes, active que es el payload de la note
                                                                // lo renombramos a note para que se lea mejor
    const [formValues, handleInputChange,reset] = useForm(note);// Utilizamos el useForm para vincular formValues con la nota activa 
                                                                
    const { body, title,id } = formValues                       // Las props de la nota se vinculan también en el value de los inputs

    const activeUrl =useRef( note.url )
    const activeId = useRef(note.id)                            //Las referencias proporcionan una forma de acceder a los nodos del DOM 
                                                                //o a elementos React creados en el método de renderizado. En este caso 
                                                                //useRef apunta a la id de la nota que se carga en el componente.

    useEffect(()=>{                                             // UseEffect para determinar que nota esta activa y se carga            
        if(note.id !== activeId.current){                       // Si la nota seleccionada nueva es distinta de la referenciada 
            reset(note);                                        // reseteamos la note { con la nueva nota activa } -> cambia los valores del useform
            activeId.current = note.id                          // Cambiamos la id, id current = id de la nueva nota 
        }
        if(note.url !== activeUrl.current){                     // Mismo procedimiento para la carga de la imagen
            reset(note);                                           
            activeUrl.current = note.url                        
        }
    },[note,reset])
                                                                // UseEffect para cambiar el contenido de la nota activa
    useEffect(() => {                                           // Cuando los inputs se rellenen o cambien se ejecutará un dispatch que cambie el estado
        dispatch(activeNote(formValues.id, {...formValues}))    // La action activeNote necesita el id y el resto del estado
    }, [formValues,dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input" 
                    autoComplete="off"
                    name="title"
                    value = { title }
                    onChange={ handleInputChange }
                    />

                <textarea
                    placeholder="What happend today"
                    className="notes__textarea"
                    name="body"
                    value = { body }
                    onChange={ handleInputChange }>
                </textarea>

                {
                    (note.url) &&                               // Si la url de la note existe se muestra esta image
                        (<div className="notes__image">
                            <img
                                src={ note.url }
                                alt="imagen"
                            />
                        </div>)
                }
            </div>

            <button 
                onClick={ handleDelete }
                className="btn btn-danger">
                Delete
            </button>
        </div>
    )
}
