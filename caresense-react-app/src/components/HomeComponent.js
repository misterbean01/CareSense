import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const Home = () => {
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("authenticated"));
    const [messages, setMessages] = useState([]);
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
        fetch("http://localhost:8080/CareSense/api/home")
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (homeResponseJSON) {
                console.log(homeResponseJSON);
                setMessages(homeResponseJSON)
            }).catch(err => {
                console.log(err);
                setMessages({ msg1: "aaa", msg2: "bbb" });
            });
    }, []);

    console.log(authenticated)
    if (!authenticated) {
        return <Navigate replace to="/login" />; // redirect to the login page if not authenticated
    } else {
        const user = userLoc.state.user;

        return (
            <div>

                <p>Welcome to Care Sense, {user.Username}</p>
                <p>{messages.msg1} to this {messages.msg2}</p>

                <ResidentList residents={residents} />

            </div>
        );
    }
};


// Card Component inside a Map For Each Resident
function ResidentList({ residents }) {
    const listOfResidents = residents.map((resident) => {
        return (

            <Card style={{ width: '18rem', margin: '2px' }} key={resident.ResidentID} >
                <Card.Body>
                    <Card.Title>{resident.Fname} {resident.Lname}, {resident.Sex}, {resident.Age}</Card.Title>
                    <Card.Text>
                        {resident.CareInstructions}
                    </Card.Text>
                </Card.Body>
                <Link to={'../resident/' + resident.ResidentID} state={{ resident: resident }}>
                    Focus
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


export default Home;