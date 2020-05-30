import React, { useState } from 'react'
import { Filter } from './Filter';
import { PersonForm } from './PersonForm';
import { PersonList } from './PersonList';

const PERSONS = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
];
const App = () => {
    const [persons, setPersons] = useState(PERSONS)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('');

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

    function doesStringInclude(base, test) {
        return base.toLowerCase().includes(test)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filterValue} inputHandler={setFilterValue} />
            <h2>Add a number</h2>
            <PersonForm
                name={newName}
                number={newNumber}
                nameChangeHandler={handleNameChange}
                numberChangeHandler={handleNumberChange}
                submitHandler={handleFormSubmit}
            />
            <h2>Numbers</h2>
            <PersonList
                persons={persons.filter(person => doesStringInclude(person.name, filterValue))}
            />
        </div>
    )
}

export default App;
