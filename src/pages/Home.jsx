// import { useEffect, useMemo, useState, useRef } from "react";
import "./Home.css";
import ContactList from "../Components/ContactList/ContactList";
import Form from "../Components/Form/Form";

const Home = () => {
    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">Doggy Database</h1>
                <p className="page__subtitle">
                    A simple contact list to track dog-walking clients
                </p>
            </header>

            <ContactList />
            <Form/>

            <footer className="page__footer">
                <small>A project by Dan Kolonay</small>
            </footer>
        </main>
    );
};

export default Home;
