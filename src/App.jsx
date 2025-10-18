import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Contact from "./Components/Contact"

import aximImage from "./assets/contact-images/axim.jpg"
import chaseImage from "./assets/contact-images/chase.jpg"
import eeveeImage from "./assets/contact-images/eevee.jpg"
import giaImage from "./assets/contact-images/gia.jpg"
import kissyImage from "./assets/contact-images/kissy.jpg"
import macImage from "./assets/contact-images/mac.jpg"
import mysticImage from "./assets/contact-images/mystic.jpg"
import pabloImage from "./assets/contact-images/pablo.jpg"
import plutoImage from "./assets/contact-images/pluto.jpg"
import walleImage from "./assets/contact-images/wall-e.jpg"



const FALLBACK_CONTACTS = [
    {
        id: 1,
        petName: "Axim",
        ownerName: "Brittany S.",
        phone: "(555) 010-0101",
        email: "brittanys@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: aximImage,
    },
    {
        id: 2,
        petName: "Chase",
        ownerName: "Steven A.",
        phone: "(555) 010-0102",
        email: "stevena@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: chaseImage,
    },
    {
        id: 3,
        petName: "Eevee",
        ownerName: "Dan K.",
        phone: "(555) 010-0103",
        email: "dank@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: eeveeImage,
    },
       {
        id: 4,
        petName: "Gia",
        ownerName: "Jennifer F.",
        phone: "(555) 010-0104",
        email: "jenniferf@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: giaImage,
    },
    {
        id: 5,
        petName: "Kissy",
        ownerName: "Alex T.",
        phone: "(555) 010-0105",
        email: "alext@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: kissyImage,
    },
    {
        id: 6,
        petName: "Mac",
        ownerName: "Gil G.",
        phone: "(555) 010-0106",
        email: "gilg@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: macImage,
    },
       {
        id: 7,
        petName: "Mystic",
        ownerName: "Alicia M.",
        phone: "(555) 010-0107",
        email: "aliciam@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: mysticImage,
    },
    {
        id: 8,
        petName: "Pablo",
        ownerName: "Lilli D.",
        phone: "(555) 010-0108",
        email: "lillid@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: pabloImage,
    },
    {
        id: 9,
        petName: "Pluto",
        ownerName: "Doruntina S.",
        phone: "(555) 010-0109",
        email: "doruntinas@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: plutoImage,
    },
        {
        id: 10,
        petName: "Wall-E",
        ownerName: "Jason L.",
        phone: "(555) 010-0110",
        email: "jasonl@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "First Avenue",
            number: "123",
            zip: "12345",
        },
        imgSrc: walleImage,
    },
];

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);

    const [query, setQuery] = useState("");

    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }

    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">Doggy Database</h1>
                <p className="page__subtitle">A simple contact list to track dog-walking clients</p>
            </header>
             <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add a Contact</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            placeholder="(555) 555-5555"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="form__actions">
                        <button className="btn" type="submit" data-testid="btn-add">
                            Add Contact
                        </button>
                    </div>
                </form>
            </section>

            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Search Contacts</h2>
                <div className="search__controls">
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name or phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {contacts.length}{" "}
                    {contacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contacts</h2>
                <div className={"contacts-list"}>
                    {contacts.map((contact)=>{
                        return <Contact key={contact.id} contactData={contact}/>
                    })}
                </div>
            </section>

           

            <footer className="page__footer">
                <small>
                    A project by Dan Kolonay
                </small>
            </footer>
        </main>
    );
};

export default App;
