import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("authenticated"));
    const [userType, setUserType] = useState(sessionStorage.getItem("userType"));
    const [weather, setWeather] = useState({});
    const [clock, setClock] = useState({});
    const [holidays, setHolidays] = useState([]);
    const [residents, setResidents] = useState([]);

    // Get the User state from Login Component
    const userLoc = useLocation();


    // HAVE A FUNCTION THAT FILTERS THE RESIDENT LIST:
    // IF THEY ARE FAMILY ONLY SHOW THEIR RESIDENT MEMBERS
    // IF THEY ARE DOCTORS ONLY SHOW THEIR RESIDENT PATIENTS
    // CARETAKERS SHOULD SEE ALL RESIDENTS


    useEffect(() => {
        getAllResident();
        getDisplay();
    }, []);

    function getAllResident() {
        fetch("/CareSense/api/resident/all")
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (residentList) {
                //console.log(clockJSON);
                setResidents(residentList);
            }).catch(err => {
                console.log(err);
                setResidents([]);
            });
    }

    function getDisplay() {
        fetch("CareSense/api/display")
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (JSON) {
                const data = JSON;
                setWeather(data.weather)
                setClock(data.clock)
                setHolidays(data.holiday)
            }).catch(err => {
                console.log(err);
                setWeather({ todayTempMin: "NA", todayTempMax: "NA", todayWeather: "Unknown" });
                setClock({
                    datetime: "NA", Month: "NA", Day: "NA", Year: "NA",
                    Hours: "NA", Minutes: "NA", Seconds: "NA",
                });
                setHolidays([{}]);
            });
    }

    try {
        if (!authenticated) {
            return <Navigate replace to="/login" />; // redirect to the login page if not authenticated
        } else {
            const user = userLoc.state.user;
            //console.log(user);
            return (
                <div>

                    <p>Welcome to Care Sense, {user.username}, ID: {user.userID} <Button onClick={() => {
                        sessionStorage.setItem("authenticated", false);
                        sessionStorage.setItem("userType", "");
                        console.log("Logout Successful");
                        navigate("/login");
                    }}>
                        Logout
                    </Button>
                    </p>

                    <div>
                        <p>Date: {clock.Month}/{clock.Day}/{clock.Year} </p>
                        <p>Time: {clock.Hours}:{clock.Minutes}</p>
                    </div>

                    <div>
                        <p>Today's Weather: {weather.todayWeather},
                            Max Temperature: {weather.todayTempMax} F,
                            Min Temperature: {weather.todayTempMin} F</p>
                    </div>

                    <ResidentList residents={residents} user={user} />

                    <HolidayList holidays={holidays} />
                </div>
            );
        }
    } catch (error) {
        console.log(error);
        return <Navigate replace to="/login" />;
    }
};


// Card Component inside a Map For Each Resident
function ResidentList({ residents, user }) {
    //console.log(user);
    const listOfResidents = residents.map((resident) => {
        return (

            <Card style={{ width: '18rem', margin: '2px' }} key={resident.userID} >
                <Card.Body>
                    <Card.Title>{resident.firstName} {resident.lastName}, {resident.gender}</Card.Title>
                    <Card.Text>
                        Birthday: {resident.birthday}
                    </Card.Text>
                    <Card.Text>
                        Contact: {resident.phoneNumber}
                    </Card.Text>
                </Card.Body>
                <Link to={'../resident/' + resident.userID} state={{ resident: resident, user: user }}>
                    Details
                </Link>
            </Card>
        )
    });
    return (
        <div>
            <Container className='p-4'>
                <Row>
                    {listOfResidents}
                </Row>
            </Container>
        </div>
    )
}

// Card Component inside a Map For Each Resident
function HolidayList({ holidays }) {
    //console.log(user);
    let holidayCount = 0;
    const listofHolidays = holidays.map((holiday) => {
        holidayCount++;
        return (

            <li key={holidayCount}>{holiday.name} on {holiday.date}</li>
        )
    });
    return (
        <div>
            <Container className='p-4'>
                Current holidays this Year:

                {listofHolidays}

            </Container>
        </div>
    )
}

export default Home;