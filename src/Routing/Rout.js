import { Routes, Route } from 'react-router-dom'; // Import corrected Route
import Home from '../Component/Home';
import Navbar from './Navbar';
import About from '../Component/About';
import Contact from '../Component/Contact';
import Login from '../Authentication/Login'
import Register from '../Authentication/Register';
import Dasboard from '../Menu-item/Dasboard';
import Page from '../Menu-item/Page';

function Rout() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} /> 
                <Route path="/login" element={<Login />} /> 
                <Route path="/register" element={<Register />} /> 
                <Route path="/dasboard" element={<Dasboard/>} /> 
                <Route path="/page" element={<Page />} /> 
            </Routes>
        </div>
    );
}
export default Rout;
