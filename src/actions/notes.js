import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";
//react-journal

export const starNewNote = () => {
    return async( dispatch, getSate ) => {

        const { uid } = getSate().auth;                                         // Obtenemos del state el uid del usuario en firebase
        
        const newNote = {                                                       // Definimos como es cada nota
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)    // Grabamos en la bd la nota
        
        dispatch( activeNote( doc.id, newNote ))
        dispatch( addNewNote( doc.id, newNote ))
    }
}

export const activeNote = ( id, note ) => ({

    type: types.notesActive,                    // Establecemos una nota como activa
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({    // Añade la note al array de notes

    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes(uid);     // Cargamos la notas correspondientes al usuario logeado
        dispatch(setNotes(notes));              // cambiamos el estado de notes en el store
    }
}


export const setNotes = ( notes ) => ({         // Establece el store
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {      // recibimos la nota que queremos grabar
    return async(dispatch, getState) => {

        const {uid} = getState().auth;          // Obtenemos el uid del usuario en firebase

        if( !note.url){                         // Si la url de la imagen no viene la borramos como campo a grabar en FB    
            delete note.url;            
        }

        const noteToFirestore = { ...note };    // En firestore la nota no contiene id
        delete noteToFirestore.id               // Borramos ese id para que concuerde con los campos a grabar
    
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore ); // Actualizamos el contenido en firebase
                     //id en FB            //id de la nota        // nuevo contenido

        dispatch(refreshNote(note.id, note));    // Refrescamos el estado de la nota para el sidebar lateral
    
        Swal.fire('Saved', note.title, 'success');
        Swal.close();
    }
}

export const refreshNote = ( id, note) => ({
    type: types.notesUpdated,
    payload:{
        id, note: {
            id, ...note
        }
    }
})

export const startUploading = (file) => {
    return async( dispatch, getState ) => {

        const { active: activeNote } = getState().notes; // Identificamos la nota activa

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=> {
                Swal.showLoading()
            }
        });


        const fileUrl = await fileUpload(file); // Con el helper fileUpload obtenemos la url donde se guardo la img en cloudinary
        activeNote.url = fileUrl;               // Actualizamos la url en la nota activa
        dispatch(startSaveNote(activeNote))     // Guardamos la nota activa en fb y refrescamos el store

        Swal.close();
    }
}

export  const startDeleting = ( id ) => {       // Necesitamos el id de la nota que queremos borrar
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;                           // Obtenemos el id del usuario que quiere borrar
         await db.doc(`${ uid }/journal/notes/${ id }`).delete();   // Borramos la nota en firebase

        dispatch(deleteNote(id));                                   // Modificamos el store
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});