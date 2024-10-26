import "./navbar.css"
import logo from './assets/logo.png';
import { Routes, Route, useNavigate} from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className = "navbar">
            {/* <img className="logo" src={logo}  onClick = {()=>{navigate('/')}}  alt="Description" /> */}
            <button onClick = {()=>{navigate('/dash')}} className = "dash">Dashboard</button>
        </div>
    );
}   


export default Navbar;