import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { PersonList } from './components/PersonList';
import { APIService } from './services/APIService';
import { generateUniqueId } from './services/UtilFunctions';

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
            if (window.confirm(`${newName} is already added to phonebook. Should the old number be replaced with  the new one?`)) {
                const existingPerson = persons.find(p => p.name === newName);
                const updatedPerson = { ...existingPerson, number: newNumber };
                APIService
                    .putPerson(updatedPerson)
                    .then(updatedPerson => setPersons(persons
                        .filter(p => p.id !== existingPerson.id)
                        .concat(updatedPerson))
                    )
                    .catch(error => window.alert(error));
            }
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

    function handleDeletePerson(person) {
        if (window.confirm(`Are you sure you want to delete ${person.name}'s contact`)) {
            APIService
                .deletePerson(person)
                .then(_ => setPersons(persons.filter(p => p.id !== person.id)))
                .catch(error => window.alert(error))
        }
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
                onDelete={handleDeletePerson}
            />
        </div>
    )
}

export default App;
