import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

import s from './App.module.css';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');
    const firstRender = useRef(false);

    useEffect(() => {
        const contact = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contact);

        if (contact && parsedContacts.length !== 0) {
            setContacts([...parsedContacts]);
        }
        firstRender.current = true;
    }, []);

    useEffect(() => {
        if (firstRender.current) {
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
    }, [contacts]);

    const formSubmit = data => {
        let names = contacts.map(el => el.name.toLowerCase());
        let newContact = { id: nanoid(), ...data };

        names.includes(data.name.toLowerCase())
            ? alert(`${data.name} is already in your contacts`)
            : setContacts([newContact, ...contacts]);
    };

    const onChangeFilter = e => {
        const { value } = e.currentTarget;
        setFilter(value);
    };

    const deleteContact = contactId => {
        setContacts(contacts.filter(contact => contact.id !== contactId));
    };

    const lowerCaseFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(lowerCaseFilter)
    );

    return (
        <div className={s.wrap}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={formSubmit} />
            <h2>Contacts</h2>
            <Filter filter={filter} changeFilter={onChangeFilter} />
            <ContactList
                deleteContact={deleteContact}
                contacts={visibleContacts}
            />
        </div>
    );
};

export default App;