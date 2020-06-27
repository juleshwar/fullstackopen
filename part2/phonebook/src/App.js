import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Filter } from './Filter';
import { PersonForm } from './PersonForm';
import { PersonList } from './PersonList';
import { APIService } from './APIService';
import { generateUniqueId } from './UtilFunctions';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => setPersons(response.data))
    }, [])

    function isNameAlreadyPresentInPhonebook(name) {
        return persons.some(person => person.name === name);
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        if (isNameAlreadyPresentInPhonebook(newName)) {
            window.alert(`${newName} is already added to phonebook`)
            return;
        }
        const newPerson = { name: newName, number: newNumber, id: generateUniqueId() };
        APIService
            .postPerson(newPerson)
            .then(person => setPersons(persons.concat(person)))
            .catch(error => window.alert(error))
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
