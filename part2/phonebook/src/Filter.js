import React from 'react';
export const Filter = ({ value, inputHandler }) => {
    return (
        <>
            Filter phonebook: <input value={value} onChange={(event) => inputHandler(event.target.value)} />
        </>
    )
}