import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ContactContext } from "../../ContactContext";

import Contact from "../Contact/Contact";
import "./ContactList.css";

import searchIcon from "../../assets/search.png";

const ITEMS_PER_PAGE = 4;

// const FALLBACK_CONTACTS = [
//     {
//         id: 1,
//         petName: "Axim",
//         ownerName: "Brittany S.",
//         phone: "(555) 010-0101",
//         email: "brittanys@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123 First Avenue",
//             zip: "12345",
//         },
//         imgSrc: aximImage,
//     },
//     {
//         id: 2,
//         petName: "Chase",
//         ownerName: "Steven A.",
//         phone: "(555) 010-0102",
//         email: "stevena@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123 First Avenue",
//             zip: "12345",
//         },
//         imgSrc: chaseImage,
//     },
//     {
//         id: 3,
//         petName: "Eevee",
//         ownerName: "Dan K.",
//         phone: "(555) 010-0103",
//         email: "dank@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123 First Avenue",
//             zip: "12345",
//         },
//         imgSrc: eeveeImage,
//     },
//     {
//         id: 4,
//         petName: "Gia",
//         ownerName: "Jennifer F.",
//         phone: "(555) 010-0104",
//         email: "jenniferf@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123 First Avenue",
//             zip: "12345",
//         },
//         imgSrc: giaImage,
//     },
//     {
//         id: 5,
//         petName: "Kissy",
//         ownerName: "Alex T.",
//         phone: "(555) 010-0105",
//         email: "alext@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123 First Avenue",
//             zip: "12345",
//         },
//         imgSrc: kissyImage,
//     },
//     {
//         id: 6,
//         petName: "Mac",
//         ownerName: "Gil G.",
//         phone: "(555) 010-0106",
//         email: "gilg@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123 First Avenue",
//             zip: "12345",
//         },
//         imgSrc: macImage,
//     },
//     {
//         id: 7,
//         petName: "Mystic",
//         ownerName: "Alicia M.",
//         phone: "(555) 010-0107",
//         email: "aliciam@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123 First Avenue",
//             zip: "12345",
//         },
//         imgSrc: mysticImage,
//     },
//     {
//         id: 8,
//         petName: "Pablo",
//         ownerName: "Lilli D.",
//         phone: "(555) 010-0108",
//         email: "lillid@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123 First Avenue",
//             zip: "12345",
//         },
//         imgSrc: pabloImage,
//     },
//     {
//         id: 9,
//         petName: "Pluto",
//         ownerName: "Doruntina S.",
//         phone: "(555) 010-0109",
//         email: "doruntinas@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123 First Avenue",
//             zip: "12345",
//         },
//         imgSrc: plutoImage,
//     },
//     {
//         id: 10,
//         petName: "Wall-E",
//         ownerName: "Jason L.",
//         phone: "(555) 010-0110",
//         email: "jasonl@example.com",
//         address: {
//             city: "New York",
//             state: "NY",
//             street: "123First Avenue",
//             zip: "12345",
//         },
//         imgSrc: walleImage,
//     },
// ];




const ContactList = () => {
    const {contacts, error,loading} = useContext(ContactContext)
    const [searchParams, setSearchParams] = useSearchParams();

    let pageNumber = searchParams.get("page");
    if (!pageNumber){
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: "0" });
    }
    pageNumber = parseInt(pageNumber);

    const [query, setQuery] = useState("");

    const headerRef = useRef(null);

    const navigate = useNavigate();

    function goToPrevPage() {
        if (pageNumber > 0) {
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: pageNumber - 1 });
            headerRef.current.scrollIntoView();
        }
    }

    function goToNextPage() {
        if (Object.keys(contacts).length / (pageNumber + 1) > ITEMS_PER_PAGE) {
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: pageNumber + 1 });
            headerRef.current.scrollIntoView();
        }
    }

    function navigateToDetailsPage(pageId){
        navigate(`/details/${pageId}`);
    }

    const start = pageNumber * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    
    return (
        <section className="contacts" aria-labelledby="contacts-heading">
            <h2 id="contacts-heading" ref={headerRef}>
                Contacts
            </h2>
            <section className="search" aria-labelledby="search-heading">
                <div className="search__controls">
                    <img src={searchIcon} alt="search" />
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name or phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                </div>
                <p className="search__results" data-testid="results-count">
                    Showing {contacts.length}{" "}
                    {contacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>
            {!(loading || error) && (
                <div className={"contacts-list"}>
                    {Object.entries(contacts).slice(start, end).map((contact) => {
                        return <Contact key={contact[0]} contactData={contact[1]} nav={navigateToDetailsPage} />;
                    })}
                </div>
            )}

            <div>
                <button  onClick={goToPrevPage} disabled={pageNumber == 0}>prev</button>
                <button onClick={goToNextPage} disabled={contacts.length / (pageNumber + 1) <= ITEMS_PER_PAGE}>next</button>
            </div>
        </section>
    );
};

export default ContactList;
