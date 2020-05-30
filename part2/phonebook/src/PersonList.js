import React from 'react'

export const PersonList = ({ persons }) => {
    return (
        <ul>
            {
                persons.map((person, index) =>
                    <li key={person.name + index}>{person.name} {person.number}</li>)
            }
        </ul>
    )
}