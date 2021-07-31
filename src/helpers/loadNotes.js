import { db } from "../firebase/firebaseConfig"


export const loadNotes = async( uid ) => {

    const notesSnap = await db.collection(`${uid}/journal/notes` ).get();   // Cargamos la notas según UID(user)
    const notes = [];

    notesSnap.forEach( snapHijo =>{ // De cada nota extraemos su id y su contenido
        notes.push({                
            id: snapHijo.id,        // En el array vacio introducimos lo que nos interesa
            ...snapHijo.data()      // el id de cada nota y su contenido
        })
    })

    console.log(notes);

    return notes;
}