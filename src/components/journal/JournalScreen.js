import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes); // Extraemos del estado el valor de active

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            <Sidebar />

            <main>
                {
                    ( active )                          // Si hay notas activas,
                        ? (<NoteScreen/>)               // las mostramos.
                        : (<NothingSelected />)         // Sino mostramos esto.
                }
                
            </main>

        </div>
    )
}
