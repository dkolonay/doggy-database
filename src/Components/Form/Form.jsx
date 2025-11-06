import { useState, useRef, useContext } from "react";
import { ContactContext } from "../../ContactContext";

import "./Form.css";

import photoIcon from "../../assets/photo.png";

const DEFAULT_FORM_STATE = {
        petName: "",
        ownerName: "",
        phone: "",
        email: "",
        description: "",
        address: { city: "", state: "", street: "", zip: "" },
        imgSrc: "/contact-images/axim.jpg",
    }

const Form = () => {
    const { setContacts, nextId } = useContext(ContactContext);

    const [form, setForm] = useState(DEFAULT_FORM_STATE);

    const [ownerNameValid, setOwnerNameValid] = useState(null);
    const [petNameValid, setPetNameValid] = useState(null);
    const [phoneValid, setPhoneValid] = useState(null);
    const [emailValid, setEmailValid] = useState(null);

    const imageInputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        let formValid = true;

        if (!ownerNameValid) {
            setOwnerNameValid(false);
            formValid = false;
        }
        if (!petNameValid) {
            setPetNameValid(false);
            formValid = false;
        }
        if (!phoneValid) {
            setPhoneValid(false);
            formValid = false;
        }
        if (!emailValid) {
            setEmailValid(false);
            formValid = false;
        }

        if (formValid) {
            setContacts((prevContacts) => {
                const newContacts = structuredClone(prevContacts);
                const newContact = structuredClone(form);
                newContact.id = nextId;
                newContacts[nextId] = newContact;

                return newContacts;
            });
            setForm(DEFAULT_FORM_STATE);
            setOwnerNameValid(null);
            setPetNameValid(null);
            setPhoneValid(null);
            setEmailValid(null);
        }
    }

    function validateField(e) {
        switch (e.target.id) {
            case "petName":
                setPetNameValid(e.target.value.length >= 2);
                break;
            case "ownerName":
                setOwnerNameValid(e.target.value.length >= 2);
                break;
            case "phone":
                let cleanPhoneNumber = e.target.value.replaceAll("-", "");
                cleanPhoneNumber = cleanPhoneNumber.replaceAll("(", "");
                cleanPhoneNumber = cleanPhoneNumber.replaceAll("}", "");

                setPhoneValid(cleanPhoneNumber.length >= 10);
                break;
            case "email":
                setEmailValid(
                    e.target.value.length > 4 &&
                        e.target.value.includes("@") &&
                        e.target.value.includes(".")
                );
                break;
        }
    }

    function clickImageInput(e) {
        e.preventDefault();
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    }

    return (
        <section className="form" aria-labelledby="form-heading">
            <h2 id="form-heading">Add a New Furry Friend!</h2>
            <form className="form__body" onSubmit={handleSubmit} noValidate>
                <p className="form-subheading" id="contact-info-header">
                    Contact Info
                </p>
                <div className="field" id="pet-name-field">
                    <label htmlFor="petName">Pet Name</label>
                    <input
                        id="petName"
                        className={petNameValid === false ? "input-error" : ""}
                        name="petName"
                        placeholder="Fido"
                        value={form.petName}
                        onChange={(e) => setForm({ ...form, petName: e.target.value })}
                        onBlur={validateField}
                        required
                        minLength={2}
                    />
                    <p
                        className={`field-error ${petNameValid === false ? "" : "field-error-hidden"}`}
                    >
                        Provide a valid pet name.
                    </p>
                </div>
                <div className="field" id="owner-name-field">
                    <label htmlFor="ownerName">Owner Name</label>
                    <input
                        id="ownerName"
                        className={ownerNameValid === false ? "input-error" : ""}
                        name="ownerName"
                        placeholder="John Doe"
                        value={form.ownerName}
                        onChange={(e) =>
                            setForm({ ...form, ownerName: e.target.value })
                        }
                        onBlur={validateField}
                    />
                    <p
                        className={`field-error ${ownerNameValid === false ? "" : "field-error-hidden"}`}
                    >
                        Provide a valid owner name.
                    </p>
                </div>
                <button className="image-input-container" onMouseUp={clickImageInput}>
                    <input
                        type="file"
                        id="pet-photo-input"
                        accept=".jpg, .jpeg, .png,"
                        ref={imageInputRef}
                    />
                    <img alt="photo icon" src={photoIcon} />
                </button>
                <div className="field" id="phone-field">
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        className={phoneValid === false ? "input-error" : ""}
                        name="phone"
                        inputMode="tel"
                        placeholder="(555) 555-5555"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        onBlur={validateField}
                        required
                    />
                    <p
                        className={`field-error ${phoneValid === false ? "" : "field-error-hidden"}`}
                    >
                        Provide a valid phone number.
                    </p>
                </div>

                <div className="field" id="email-field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className={emailValid === false ? "input-error" : ""}
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onBlur={validateField}
                    />
                    <p
                        className={`field-error ${emailValid === false ? "" : "field-error-hidden"}`}
                    >
                        Provide a valid email.
                    </p>
                </div>
                <p className="form-subheading" id="address-info-header">
                    Address Info
                </p>
                <div className="field" id="street-field">
                    <label htmlFor="street">Street Address</label>
                    <input
                        id="street"
                        name="street"
                        placeholder="123 Main Street"
                        value={form.address.street}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                address: {
                                    ...form.address,
                                    street: e.target.value,
                                },
                            })
                        }
                    />
                </div>
                <div className="field" id="city-field">
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        name="city"
                        placeholder="Sample Town"
                        value={form.address.city}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                address: { ...form.address, city: e.target.value },
                            })
                        }
                    />
                </div>
                <div className="field" id="state-field">
                    <label htmlFor="state">State</label>
                    <input
                        id="state"
                        name="state"
                        placeholder="NY"
                        value={form.address.state}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                address: { ...form.address, state: e.target.value },
                            })
                        }
                    />
                </div>
                <div className="field" id="zip-field">
                    <label htmlFor="zip">Zip</label>
                    <input
                        id="zip"
                        name="zip"
                        placeholder="12345"
                        value={form.address.zip}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                address: { ...form.address, zip: e.target.value },
                            })
                        }
                    />
                </div>

                <div className="field" id="description-field">
                    <label htmlFor="description">Pet Details</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Write some notes/details about this pet..."
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value,
                            })
                        }
                    ></textarea>
                </div>

                <div className="form__actions" id="actions">
                    <button className="btn" type="submit" data-testid="btn-add">
                        Submit New Contact
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
