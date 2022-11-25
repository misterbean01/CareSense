import './App.css';
//import { HashRouter as Router, Route, Routes } from 'react-router-dom'; //use in heroku
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //use in local
import Home from './components/HomeComponent';
import Login from './components/LoginComponent';
import Resident from './components/ResidentComponent';
import Registration from './components/RegistrationComponent';
import Admin from './components/AdminComponent';
import RegisterResident from './components/RegisterResidentComponent';
import { Navigation } from './components/NavigationComponent';


function App() {
  return (
    <Router>
      <div className="container">
        <h4 className="m-3 d-flex justify-content-center">
          Care Sense
        </h4>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/registerresident" element={<RegisterResident />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/resident/:ResidentID/" element={<Resident />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;

/**
    <Router>
      <div className="container">
        <h4 className="m-3 d-flex justify-content-center">
          Find the place you want to travel here at Travel App
        </h4>

        <Navigation />

        <Routes>
          <Route path="/location" element={<Location />} />
          <Route path="/traveller" element={<Traveller />} />
          <Route path="/location/:locId/review" element={<Review />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
 */