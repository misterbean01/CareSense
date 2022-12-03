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
    const [accountType, setAccountType] = useState(sessionStorage.getItem("accountType"));
    const [weather, setWeather] = useState({});
    const [clock, setClock] = useState({});
    const [holidays, setHolidays] = useState([]);
    const [residents, setResidents] = useState([
        { ResidentID: 1, Fname: "Harold", Lname: "Hide", Sex: "Male", Age: 70, FamilyID: 1, DoctorID: 1, SensorID: 1, LocationID: 1, CareInstructions: "Morning Exercises for 10 minutes." },
        { ResidentID: 2, Fname: "Lisa", Lname: "Lisa", Sex: "Female", Age: 70, FamilyID: 2, DoctorID: 2, SensorID: 2, LocationID: 2, CareInstructions: "Sleep 8 hours a day." },
        { ResidentID: 3, Fname: "Rodger", Lname: "Hide", Sex: "Male", Age: 72, FamilyID: 1, DoctorID: 3, SensorID: 3, LocationID: 1, CareInstructions: "Drink Water every 4 hours." },
        { ResidentID: 4, Fname: "Ann", Lname: "Tony", Sex: "Female", Age: 71, FamilyID: 3, DoctorID: 2, SensorID: 4, LocationID: 2, CareInstructions: "Massages before walking." }
    ]);

    // Get the User state from Login Component
    const userLoc = useLocation();


    // HAVE A FUNCTION THAT FILTERS THE RESIDENT LIST:
    // IF THEY ARE FAMILY ONLY SHOW THEIR RESIDENT MEMBERS
    // IF THEY ARE DOCTORS ONLY SHOW THEIR RESIDENT PATIENTS
    // CARETAKERS SHOULD SEE ALL RESIDENTS


    useEffect(() => {
        getWeatherToday();
        getClockToday();
        getHoliday();
    }, []);

    function getWeatherToday() {
        fetch("CareSense/api/weather")
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (weatherJSON) {
                //console.log(weatherJSON);
                setWeather(weatherJSON)
            }).catch(err => {
                //console.log(err);
                setWeather({ todayTempMin: "NA", todayTempMax: "NA", todayWeather: "Unknown" });
            });
    }

    function getClockToday() {
        fetch("CareSense/api/clock")
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (clockJSON) {
                //console.log(clockJSON);
                setClock(clockJSON)
            }).catch(err => {
                console.log(err);
                setClock({
                    datetime: "NA", Month: "NA", Day: "NA", Year: "NA",
                    Hours: "NA", Minutes: "NA", Seconds: "NA",
                });
            });
    }

    function getHoliday() {
        fetch("CareSense/api/holiday")
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (holidayJSON) {
                console.log(holidayJSON);
                setHolidays(holidayJSON)
            }).catch(err => {
                console.log(err);
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

                    <p>Welcome to Care Sense, {user.Username}, ID: {user.ID} <Button onClick={() => {
                        sessionStorage.setItem("authenticated", false);
                        sessionStorage.setItem("accountType", "");
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

            <Card style={{ width: '18rem', margin: '2px' }} key={resident.ResidentID} >
                <Card.Body>
                    <Card.Title>{resident.Fname} {resident.Lname}, {resident.Sex}, {resident.Age}</Card.Title>
                    <Card.Text>
                        {resident.CareInstructions}
                    </Card.Text>
                </Card.Body>
                <Link to={'../resident/' + resident.ResidentID} state={{ resident: resident, user: user }}>
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
    const listofHolidays = holidays.map((holiday) => {
        return (

            <li>{holiday.name} on {holiday.date}</li>
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