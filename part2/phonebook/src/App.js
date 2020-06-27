import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { PersonList } from './components/PersonList';
import { APIService } from './services/APIService';
import { generateUniqueId } from './services/UtilFunctions';
import { Notification } from './components/Notification';
import './App.css';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('');
    const [notificationObject, setNotificationObject] = useState({ type: 'success', message: '' });

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => setPersons(response.data))
    }, [])

    function notify(type, message) {
        setNotificationObject({ type, message });
        setTimeout(_ => setNotificationObject({ type: 'success', message: '' }), 3000);
    }

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
                    .then(_ => notify('success', `Updated ${updatedPerson.name}'s contact`))
                    .catch(error => notify('error', error));
            }
            return;
        }
        const newPerson = { name: newName, number: newNumber, id: generateUniqueId() };
        APIService
            .postPerson(newPerson)
            .then(person => setPersons(persons.concat(person)))
            .then(_ => notify('success', `Added ${newPerson.name}'s contact`))
            .catch(error => notify('error', error))
        setNewName('');
        setNewNumber('');
    }

    function handleDeletePerson(person) {
        if (window.confirm(`Are you sure you want to delete ${person.name}'s contact`)) {
            APIService
                .deletePerson(person)
                .then(_ => setPersons(persons.filter(p => p.id !== person.id)))
                .then(_ => notify('success', `Deleted ${person.name}'s contact`))
                .catch(_ => {
                    setPersons(persons.filter(p => p.id !== person.id));
                    notify('error', `${person.name}'s contact has already been deleted`);
                })
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
            <Notification config={notificationObject} />
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
