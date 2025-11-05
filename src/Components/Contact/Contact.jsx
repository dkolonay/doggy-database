import "./Contact.css";

const Contact = (props) => {
    const contactData = props.contactData;
    const query = props.query;

    const handleClick = (e) => {
        e.preventDefault();
        props.nav(contactData.id);
    };

    const highlightQuery = (str, type) => {
        const newElement = [];
        if (str.includes(query)) {
            const strArray = str.split(query);
            console.log(strArray);
            strArray.forEach((substring, idx) => {
                newElement.push(<span className={"detail-span"}>{substring}</span>);
                if (idx != strArray.length - 1) {
                    newElement.push(<span className="query-span">{query}</span>);
                }
            });
        } 
        if (type === "h3") {
            return <h3 className={"contact-title"}>{newElement}</h3>;
        } else if (type === "p") {
            return <p>{newElement}</p>;
        }
    };

    let ownerNameElement = (
        <p className={"contact-data-point"}>Name: {contactData.ownerName}</p>
    );

    let phoneElement = (
        <p className={"contact-data-point"}>Phone: {contactData.phone}</p>
    );

    let petNameElement = <h3 className={"contact-title"}>{contactData.petName}</h3>;

    if (query) {
        petNameElement = highlightQuery(contactData.petName, "h3");
        ownerNameElement = highlightQuery(contactData.ownerName, "p");
        phoneElement = highlightQuery(contactData.phone, "p");
    }

    return (
        <li className={"contact"}>
            <div className={"pet-image-container"}>
                <img
                    className={"pet-image"}
                    src={contactData.imgSrc}
                    alt={contactData.petName}
                    key={contactData.id}
                />
            </div>

            <div className={"contact-data-area"}>
                {petNameElement}
                <div className="data-row">
                    <div className={"details-block"}>
                        <h4 className={"contact-subtitle"}>Owner Details:</h4>
                        {ownerNameElement}
                        {phoneElement}
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
                <button onClick={handleClick}>View Details</button>
            </div>
        </li>
    );
};

export default Contact;
