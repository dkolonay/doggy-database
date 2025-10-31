import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ContactContext } from "../ContactContext";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import "./ContactDetails.css";

const ContactDetails = () => {
    const { contacts, loading, error } = useContext(ContactContext);
    const [nextId, setNextId] = useState(null);
    const [prevId, setPrevId] = useState(null);

    const navigate = useNavigate();

    const { id } = useParams();

    const goBack = () => {
        navigate(-1);
    };

    const navToPrev = () => {
        if (prevId) {
            navigate(`/details/${prevId}`, { replace: true });
        }
    };

    const navToNext = () => {
        if (nextId) {
            navigate(`/details/${nextId}`, { replace: true });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (contacts) {
            let next = null;
            let prev = null;

            const contactIds = Object.keys(contacts);
            contactIds.forEach((contactId, idx) => {
                if (contactId == id) {
                    if (idx > 0) {
                        prev = contactIds[idx - 1];
                    }
                    if (idx < contactIds.length - 1) {
                        next = contactIds[idx + 1];
                    }
                }
            });

            setNextId(next);
            setPrevId(prev);
        }
    }, [id, contacts]);

    let contactData = null;
    if (id in contacts) {
        contactData = contacts[id];
    }
    if (loading || error) {
        return <p>{error ? error : loading}</p>;
    }

    return (
        <main className="page">
            <Header />

            <section className={"details-card"}>
                <div className="back-container" onClick={goBack}>
                    <div className={"back-arrow-container"}>
                        <div className="arrow-head">
                            <div className="arrow-head-part arrow-top"></div>
                            <div className="arrow-head-part arrow-bottom"></div>
                        </div>
                        <div className="arrow-horizontal-bar"></div>
                    </div>
                    <p>back to list</p>
                </div>

                <div className={"details-header"}>
                    <img src={contactData.imgSrc} alt={contactData.petName} />
                    <div>
                        <h2>{contactData.petName}</h2>
                        <p>{contactData.ownerName}</p>
                    </div>
                </div>
                <div>
                    <h3>Contact Info</h3>
                    <p>Owner: {contactData.ownerName}</p>
                    <p>Phone: {contactData.phone}</p>
                    <p>Email: {contactData.email}</p>
                </div>
                <div>
                    <h3>Address</h3>
                    <p>{contactData.address.street}</p>
                    <p>
                        {contactData.address.city}, {contactData.address.state}
                    </p>
                    <p>{contactData.address.zip}</p>
                </div>
                <div>
                    <h3>Pet Description</h3>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Molestiae eum distinctio reiciendis error maxime, voluptate ab
                        neque impedit dolores sed deleniti. Totam in qui quidem
                        distinctio quia non quisquam eaque nostrum id provident deserunt
                        quibusdam aspernatur quod soluta minus, architecto iusto modi
                        iure numquam enim. Earum ab iusto deleniti delectus.
                    </p>
                </div>
                <div className={"details-actions"}>
                    <button className={"edit-contact"}>Edit Contact</button>
                    <button className={"delete-contact"}>Delete Contact</button>
                </div>
                <nav>
                    <div
                        className={`details-prev ${prevId ? "" : "inactive-nav"}`}
                        onClick={navToPrev}
                    >
                        <p>&lt; Prev</p>
                    </div>
                    <div
                        className={`details-next ${nextId ? "" : "inactive-nav"}`}
                        onClick={navToNext}
                    >
                        <p>Next &gt;</p>
                    </div>
                </nav>
            </section>
            <Footer />
        </main>
    );
};

export default ContactDetails;
