// MyContext.js
import React, { createContext, useState, useEffect } from "react";

export const ContactContext = createContext();

export const ContactContextProvider = ({ children }) => {
    const [contacts, setContacts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextId, setNextId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/data/contacts.json");
                if (!res.ok) {
                    throw new Error(`Error: status: ${res.status}`);
                }
                const jsonData = await res.json();

                setContacts(jsonData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        let storedContacts = localStorage.getItem("contacts");

        if (storedContacts){
            
            setContacts(JSON.parse(storedContacts))
            setLoading(false);
        } else {
            fetchData();
        }
    }, []);

    useEffect(()=>{
        if (Object.keys(contacts).length != 0){
            //update next id when contact is added or removed
            const currentIdStrings = Object.keys(contacts);
            const currentIds = currentIdStrings.map((idString)=> parseInt(idString));
            const maxId = Math.max(...currentIds);
            setNextId(maxId + 1);


            //update local storage for persistence 
            localStorage.setItem("contacts", JSON.stringify(contacts));
        }

    }, [contacts])

    return (
        <ContactContext.Provider value={{ contacts, setContacts, error, loading, nextId }}>
            {children}
        </ContactContext.Provider>
    );
};
