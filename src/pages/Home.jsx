// import { useEffect, useMemo, useState, useRef } from "react";
import "./Home.css";
import ContactList from "../Components/ContactList/ContactList";
import Form from "../Components/Form/Form";
import Header from "../Components/Header"
import Footer from "../Components/Footer"

const Home = () => {
    return (
        <main className="page" data-testid="page-root">
            <Header/>
            <ContactList />
            <Form/>
            <Footer/>
        </main>
    );
};

export default Home;
