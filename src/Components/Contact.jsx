import "./Contact.css";

const Contact = (props) => {
    const contactData = props.contactData;
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
                <h3>{contactData.petName}</h3>
                <div className={"contact-data-flex-row"}>
                    <div className={"owner-details-block"}>
                        <h4>Owner Details:</h4>
                        <p>Name: {contactData.ownerName}</p>
                        <p>Phone: {contactData.phone}</p>
                        <p>Email: {contactData.email}</p>
                    </div>
                    <div className={"address-block"}>
                        <h4>Address:</h4>
                        <p>
                            {contactData.address.number} {contactData.address.street}
                        </p>
                        <p>
                            {contactData.address.city}, {contactData.address.state}
                        </p>
                        <p>{contactData.address.zip}</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Contact;
