import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes); // Del state selecciono la nota que esta activa

    const handleSave = () => {
        console.log(active);
        dispatch( startSaveNote(active))
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();    // Cuando demos en el boton de picture activaremos el click sobre
    }                                                       // el input file y activaremos a su vez el handleFileChange    

    const handleFileChange = (e) => {
        
        const file = e.target.files[0];                     // Definimos el file
            if(file){                                       // Si el file existe
                dispatch(startUploading(file));
            }
    }

    return (
        <div className="notes__appbar">

            <span>28 agosto 2021</span>
        
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{display: 'none'}}
                onChange={ handleFileChange }
            />

            <div>
                <button
                    onClick={ handlePictureClick }
                    className="btn">
                    Picture
                </button>

                <button 
                    onClick={ handleSave }
                    className="btn">
                    Save
                </button>
            </div>

        </div>
    )
}
