import './App.css';
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";

import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    
    // <Routes className="App">
    //   <Route path='/' element={<About/>}></Route>
    //   <Route path='/dash' element={<Dashboard/>}></Route>
    // </Routes>
    <div>
      <Dashboard/>
    </div>

    // </Router>
  );
}

export default App;
