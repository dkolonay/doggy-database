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
                <h3 className ={"contact-title"}>{contactData.petName}</h3>
                <div className={"contact-data-flex-row"}>
                    <div className={"owner-details-block"}>
                        <h4 className={"contact-subtitle"}>Owner Details:</h4>
                        <p className={"contact-data-point"}>Name: {contactData.ownerName}</p>
                        <p className={"contact-data-point"}>Phone: {contactData.phone}</p>
                        <p className={"contact-data-point"}>Email: {contactData.email}</p>
                    </div>
                    <div className={"address-block"}>
                        <h4 className={"contact-subtitle"}>Address:</h4>
                        <p className={"contact-data-point"}>
                            {contactData.address.number} {contactData.address.street}
                        </p>
                        <p className={"contact-data-point"}>
                            {contactData.address.city}, {contactData.address.state}
                        </p>
                        <p className={"contact-data-point"}>{contactData.address.zip}</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Contact;
