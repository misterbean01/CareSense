import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useLocation } from "react-router-dom";

const MyResident = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("authenticated"));
    const [userType, setUserType] = useState(sessionStorage.getItem("userType"));
    const stateLoc = useLocation();
    const user = stateLoc.state.user;
    const [prescriptions, setPrescriptions] = useState([]);
    const [family, setFamily] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [caretaker, setCaretaker] = useState([]);
    const [sensor, setSensor] = useState({});
    const [location, setLocation] = useState({});

    const [fruitName, setFruitName] = useState("");
    const [fruitNutrition, setFruitNutrition] = useState("");

    useEffect(() => {
        getResidentDetails(user.userID);
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getResidentDetails(id) {
        let address = "/CareSense/api/resident/details/" + id;

        try {
            const res = await fetch(address, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Origin": "http://localhost:8080",
                    "Access-Control-Request-Method": "GET",
                    "Access-Control-Allow-Headers":
                        "Origin, X-Requested-With, Content-Type, Accept"
                }
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
            const data = await res.json();
            //console.log(data);
            setLocation(data.location);
            setSensor(data.sensor);
            setFamily(data.familyMember);
            setDoctor(data.doctor);
            setCaretaker(data.caretaker)
            setPrescriptions(data.prescription);
        } catch (err) {
            console.log(err.message);
        }
    }


    const handleSubmitFruitName = (e) => {
        e.preventDefault();
        getFruitNutrition(fruitName);
    };

    async function getFruitNutrition(fruitName) {
        let address = "/CareSense/api/fruit/";

        let fruit = { name: fruitName };

        try {
            const res = await fetch(address, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Origin": "http://localhost:8080",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Allow-Headers":
                        "Origin, X-Requested-With, Content-Type, Accept"
                },
                body: JSON.stringify(fruit),
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
            const data = await res.json();
            const result = {
                status: res.status + "-" + res.statusText,
                headers: {
                    "Content-Type": res.headers.get("Content-Type"),
                    "Content-Length": res.headers.get("Content-Length"),
                },
                data: data,
            };
            console.log(result.data);
            setFruitNutrition(result.data);
        } catch (err) {
            console.log(err.message);
            setFruitNutrition({ name: "NA", carbohydrates: "NA", protein: "NA", fat: "NA", calories: "NA", sugar: "NA" });
        }

        // USE A FUNCTION TO REFRESH THE LIST

    }

    // async function getSensor getLocation getFamily getDoctor getPrescription getNutrition

    function PrescriptionList({ prescriptions, edit, add }) {
        // RETRIVE THIS FROM DATABASE THAT IS FILTERED
        let listCount = 0;
        const listOfPrescription = prescriptions.map((prescription) => {
            listCount++;
            return (

                <tr key={listCount}>
                    <td>{prescription.prescriptionID}</td>
                    <td>{prescription.medicationName}</td>
                    <td>{prescription.dose}</td>
                    <td>{prescription.frequency}</td>
                    <td>{prescription.intendedUse}</td>
                    <td>{prescription.instructions}</td>
                </tr>
            )
        });
        return (
            <div>
                <Container className='my-1'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Prescription ID</th>
                                <th>Prescription Name</th>
                                <th>Dose</th>
                                <th>Frequency</th>
                                <th>Intended Use</th>
                                <th>Instructions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfPrescription}
                        </tbody>
                    </Table>
                </Container>
            </div >
        )
    }

    function UserList({ usersAssociated }) {
        const listOfUsers = usersAssociated.map((user) => {
            return (

                <tr key={user.userID}>
                    <td>{user.userID}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.gender}</td>
                    <td>{user.phoneNumber}</td>
                </tr>
            )
        });
        return (
            <div>
                <Container className='my-1'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfUsers}
                        </tbody>
                    </Table>
                </Container>
            </div >
        )
    }

    //console.log(user);
    if (!authenticated) {
        return <Navigate replace to="/login" />; // redirect to the login page if not authenticated
    } else {
        return (
            <div>
                <div className="container">
                    <p>Welcome to Care Sense, {user.username}, ID: {user.userID} <Button onClick={() => {
                        sessionStorage.setItem("authenticated", false);
                        sessionStorage.setItem("userType", "");
                        console.log("Logout Successful");
                        navigate("/login");
                    }}>
                        Logout
                    </Button>
                    </p>

                    <p>{user.firstName}'s Resident Page (ID: {user.userID})</p>

                    <Table className="mt-5" striped bordered hover size="sm">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{user.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{user.lastName}</td>
                            </tr>
                            <tr>
                                <td>Birthday</td>
                                <td>{user.birthday}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{user.gender}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{user.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <p>Family: </p>
                    <UserList usersAssociated={family} />

                    <p>Doctor:  </p>
                    <UserList usersAssociated={doctor} />

                    <p>Caretaker:  </p>
                    <UserList usersAssociated={caretaker} />

                    <p>Current Prescription:</p>
                    <PrescriptionList prescriptions={prescriptions} />


                    <p>Location:
                        <li>Location ID: {location.locationID} </li>
                        <li>Latitude: {location.latitude} </li>
                        <li>Longitude: {location.longitude} </li>
                        <li>Timestamp: {location.timestamp}</li>
                    </p>


                    <p>Sensor:
                        <li>Sensor ID: {sensor.sensorID} </li>
                        <li>Blood Pressure: {sensor.bloodPressure} </li>
                        <li>Temperature: {sensor.temperature} F</li>
                        <li>Heart Rate: {sensor.heartrate} BPM</li>
                        <li>Glucose: {sensor.glucose} mg/dL</li>
                        <li>Oxygen Levels: {sensor.spO2} </li>
                        <li>Timestamp: {sensor.timestamp}</li>
                    </p>

                    <div className="m-5">
                        <form onSubmit={handleSubmitFruitName}>
                            <div className="mb-3">
                                <label className="mb-1">Get Fruit Nutrition</label>
                                <input
                                    type="text"
                                    name="FruitNutrition"
                                    className="form-control"
                                    value={fruitName}
                                    onChange={(e) => setFruitName(e.target.value)}
                                />
                            </div>
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </form>
                    </div>
                    <div className="mb-3">
                        Fruit Nutrition:
                        <li>Name: {fruitNutrition.name}</li>
                        <li>Carb: {fruitNutrition.carbohydrates}</li>
                        <li>Calories: {fruitNutrition.calories}</li>
                        <li>Fat: {fruitNutrition.fat}</li>
                        <li>Protein: {fruitNutrition.protein}</li>
                        <li>Sugar: {fruitNutrition.sugar}</li>
                    </div>

                </div>

                <div>
                    <Button className="m-2" onClick={() => {
                        navigate("/", { state: { user: user } });
                    }}>
                        Back to Home
                    </Button>
                </div>

            </div>
        );
    }
};

export default MyResident;