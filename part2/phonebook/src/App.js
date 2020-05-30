import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '100-1001' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    function isNameAlreadyPresentInPhonebook(name) {
        return persons.some(person => person.name === name);
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        if (isNameAlreadyPresentInPhonebook(newName)) {
            window.alert(`${newName} is already added to phonebook`)
            return;
        }
        setPersons(persons.concat({ name: newName, number: newNumber }));
        setNewName('');
        setNewNumber('');
    }

    function handleNameChange(event) {
        setNewName(event.target.value);
    }

    function handleNumberChange(event) {
        setNewNumber(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person, index) =>
                    <li key={person.name + index}>{person.name} {person.number}</li>
                )}
            </ul>
        </div>
    )
}

export default App;
