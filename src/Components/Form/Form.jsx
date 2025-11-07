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
};

const Form = ({ showForm, setShowForm, data, edit }) => {
    const { addContact, editContact } = useContext(ContactContext);

    const [form, setForm] = useState(edit ? data : DEFAULT_FORM_STATE);

    const [ownerNameValid, setOwnerNameValid] = useState(edit ? true : null);
    const [petNameValid, setPetNameValid] = useState(edit ? true : null);
    const [phoneValid, setPhoneValid] = useState(edit ? true : null);
    const [emailValid, setEmailValid] = useState(edit ? true : null);

    const [imageData, setImageData] = useState(edit ? data.imgSrc : "");

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
            const newContact = structuredClone(form)
            newContact.phone = cleanPhoneNumber(newContact.phone)
            if (edit) {
                editContact(newContact);
            } else {
                addContact(newContact);
            }

            handleCloseForm(true);
        }
    }

    const resetForm = () => {
        setForm(edit ? data : DEFAULT_FORM_STATE);
        setImageData(edit ? data.imgSrc : "");
        setOwnerNameValid(edit ? true : null);
        setPetNameValid(edit ? true : null);
        setPhoneValid(edit ? true : null);
        setEmailValid(edit ? true : null);
    };

    const handleCloseForm = (wasSubmitted) => {
        setShowForm(false);
        if (!wasSubmitted || !edit) {
            resetForm();
        }
    };

    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        const src = URL.createObjectURL(file);
        console.log(src);
        setImageData(src);
    };

    const cleanPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber
            .replaceAll("-", "")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll(" ", "");

        return phoneNumber;
    };

    function validateField(e) {
        switch (e.target.id) {
            case "petName":
                setPetNameValid(e.target.value.length >= 2);
                break;
            case "ownerName":
                setOwnerNameValid(e.target.value.length >= 2);
                break;
            case "phone":
                let cleanedPhoneNumber = cleanPhoneNumber(e.target.value);

                setPhoneValid(cleanedPhoneNumber.length === 10);
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
        console.log(imageInputRef.current);
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    }

    return (
        <section
            className={`form ${showForm ? "" : "hide-form"}`}
            aria-labelledby="form-heading"
        >
            <h2 id="form-heading">
                {edit ? `Edit "${data.petName}"` : "Add a New Furry Friend!"}
            </h2>
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
                <button
                    className="image-input-container"
                    type="button"
                    onMouseUp={clickImageInput}
                >
                    {imageData && (
                        <img
                            className={"image-preview"}
                            src={imageData}
                            alt="image-preview"
                        />
                    )}
                    <input
                        type="file"
                        id="pet-photo-input"
                        accept=".jpg, .jpeg, .png,"
                        ref={imageInputRef}
                        onChange={handleImagePreview}
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
                        Phone number must be 10 digits.
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
                        Submit
                    </button>
                    <button
                        className="btn cancel-btn"
                        type="button"
                        onClick={() => {
                            handleCloseForm(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
