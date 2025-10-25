import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './Components/Contact/Contact';

const router = createBrowserRouter(
    [
        {path: '/', element: <Home/>},
        {path: '/details', element: <Contact/>}
    ],
);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;