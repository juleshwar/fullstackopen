import React from 'react';

export const PersonForm = ({ name, nameChangeHandler, number, numberChangeHandler, submitHandler }) => {

    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={name} onChange={nameChangeHandler} />
            </div>
            <div>
                number: <input value={number} onChange={numberChangeHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}