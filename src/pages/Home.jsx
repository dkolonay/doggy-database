import { useState } from "react";
import "./Home.css";
import ContactList from "../Components/ContactList/ContactList";
import Form from "../Components/Form/Form";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import AddContactButton from "../Components/AddContactButton/AddContactButton";

const Home = () => {
    const [showForm, setShowForm] = useState(false)

    return (
        <main className="page" data-testid="page-root">
            <Header/>
            <ContactList />
            <Form showForm={showForm} setShowForm={setShowForm}/>
            <AddContactButton setShowForm={setShowForm}/>
            <Footer/>
        </main>
    );
};

export default Home;
