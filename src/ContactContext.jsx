// MyContext.js
import React, { createContext, useState, useEffect } from "react";

export const ContactContext = createContext();

export const ContactContextProvider = ({ children }) => {
    const [contacts, setContacts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let storedContacts = localStorage.getItem("contacts");

        const fetchData = async () => {
            try {
                const res = await fetch("/data/contacts.json");
                if (!res.ok) {
                    throw new Error(`Error: status: ${res.status}`);
                }
                const jsonData = await res.json();

                //update local contacts if successfully fetched
                localStorage.setItem("contacts", JSON.stringify(jsonData));
                setContacts(jsonData);
            } catch (err) {
                
                //if contacts cant be fetched, attempt to use most recent local copy
                if (storedContacts) {
                    const locallyHeldBackup = JSON.parse(storedContacts);
                    setContacts(locallyHeldBackup);
                } else {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <ContactContext.Provider value={{ contacts, setContacts, error, loading }}>
            {children}
        </ContactContext.Provider>
    );
};
