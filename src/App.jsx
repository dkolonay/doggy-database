// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import ContactDetails from "./pages/ContactDetails";
import NotFoundPage from './pages/NotFound/NotFound';

import {ContactContextProvider} from "./ContactContext"

function App() {
      return (
        <ContactContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<ContactDetails />} />
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </Router>
        </ContactContextProvider>
      );
    }

export default App;
