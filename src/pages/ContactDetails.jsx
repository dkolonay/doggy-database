import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ContactContext } from "../ContactContext";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import "./ContactDetails.css";

const ContactDetails = () => {
    const { contacts, loading, error } = useContext(ContactContext);

    const navigate = useNavigate();

    const params = useParams();

    const goBack = ()=>{
        navigate(-1);
    }

    let contactData = null;
    if (params.id in contacts) {
        contactData = contacts[params.id];
    }
    if (loading || error) {
        return <p>{error ? error : loading}</p>;
    }
    return (
        <main className="page">
            <Header />
            <section className={"details-card"}>
                <div className={"back-arrow-container"} onClick={goBack}>
                    <div className="arrow-head">
                        <div className="arrow-head-part arrow-top"></div>
                        <div className="arrow-head-part arrow-bottom"></div>
                    </div>
                    <div className="arrow-horizontal-bar"></div>
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
                    <p>{contactData.address.city}, {contactData.address.state}</p>
                    <p>{contactData.address.zip}</p>
                </div>
                <div>
                    <h3>Pet Description</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae eum distinctio reiciendis error maxime, voluptate ab neque impedit dolores sed deleniti. Totam in qui quidem distinctio quia non quisquam eaque nostrum id provident deserunt quibusdam aspernatur quod soluta minus, architecto iusto modi iure numquam enim. Earum ab iusto deleniti delectus.</p>
                </div>
                <div className={"details-actions"}>
                    <button>Edit Contact</button>
                    <button>Delete Contact</button>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default ContactDetails;
