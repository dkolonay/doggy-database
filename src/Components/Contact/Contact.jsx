import "./Contact.css";

import aximImage from "../../assets/contact-images/axim.jpg";

const DUMMY_CONTACT = {
        id: 1,
        petName: "Axim",
        ownerName: "Brittany S.",
        phone: "(555) 010-0101",
        email: "brittanys@example.com",
        address: {
            city: "New York",
            state: "NY",
            street: "123 First Avenue",
            zip: "12345",
        },
        imgSrc: aximImage,
    }

const Contact = (props) => {
    let contactData = DUMMY_CONTACT;
    if (props.contactData){
        contactData = props.contactData;
    }
    return (
        <article className={"contact"}>
            <div className={"pet-image-container"}>
                <img
                    className={"pet-image"}
                    src={contactData.imgSrc}
                    alt={contactData.petName}
                />
            </div>

            <div className={"contact-data-area"}>
                <h3 className={"contact-title"}>{contactData.petName}</h3>
                <div className="data-row">
                    <div className={"details-block"}>
                        <h4 className={"contact-subtitle"}>Owner Details:</h4>
                        <p className={"contact-data-point"}>
                            Name: {contactData.ownerName}
                        </p>
                        <p className={"contact-data-point"}>
                            Phone: {contactData.phone}
                        </p>
                        <p className={"contact-data-point"}>
                            Email: {contactData.email}
                        </p>
                    </div>
                    <div className={"details-block"} id={"address-detail-block"}>
                        <h4 className={"contact-subtitle"}>Address:</h4>
                        <p className={"contact-data-point"}>
                            {contactData.address.street}
                        </p>
                        <p className={"contact-data-point"}>
                            {contactData.address.city}, {contactData.address.state}
                        </p>
                        <p className={"contact-data-point"}>
                            {contactData.address.zip}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Contact;
