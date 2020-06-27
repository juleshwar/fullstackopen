import React from 'react'

export const PersonList = ({ persons, onDelete }) => {
    return (
        <ul>
            {
                persons.map(person =>
                    <li key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => { onDelete(person) }}>Delete</button>
                    </li>)
            }
        </ul>
    )
}