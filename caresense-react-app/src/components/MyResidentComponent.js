import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from "react-router-dom";

const MyResident = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("authenticated"));
    const [userType, setUserType] = useState(sessionStorage.getItem("userType"));
    const stateLoc = useLocation();
    const resident = stateLoc.state.resident;
    const user = stateLoc.state.user;
    const [prescriptions, setPrescriptions] = useState([
        { prescriptionID: 4, userID: 1, medicationName: "Drug A", dose: 100, frequency: "Once per day.", intendedUse: "Heart Burn", instructions: "After Meal." },
        { prescriptionID: 5, userID: 1, medicationName: "Drub B", dose: 150, frequency: "Once per day.", intendedUse: "Lower Blood Pressure", instructions: "Before Meal." },
    ]);
    const [fakefamily,] = useState([
        { userID: 2, userType: "Family", username: "aaa", password: "aaa", firstName: "Harold", lastName: "Hide", birthday: "01-01-1991", gender: "Male", phoneNumber: "253-111-1111" },
        { userID: 3, userType: "Family", username: "aaa", password: "aaa", firstName: "Harold", lastName: "Hide", birthday: "01-01-1991", gender: "Male", phoneNumber: "253-111-1111" },
    ]);
    const [fakedoctor,] = useState([
        { userID: 4, userType: "Doctor", username: "aaa", password: "aaa", firstName: "Harold", lastName: "Hide", birthday: "01-01-1991", gender: "Male", phoneNumber: "253-111-1111" },
        { userID: 5, userType: "Doctor", username: "aaa", password: "aaa", firstName: "Harold", lastName: "Hide", birthday: "01-01-1991", gender: "Male", phoneNumber: "253-111-1111" },
    ]);
    const [sensor, setSensor] = useState(
        { sensorID: 1, bloodPressure: "120/80", temperature: 98, heartrate: 75, glucose: 100, spO2: 95, timestamp: "12-5-2022 12:00" }
    );
    const [location, setLocation] = useState(
        { locationID: 1, latitude: 55.555555, longitude: 75.5422111, timestamp: "12-5-2022 12:00" }
    );

    const [fruitName, setFruitName] = useState("");
    const [fruitNutrition, setFruitNutrition] = useState("");

    useEffect(() => {

    }, []);

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
                <Container className='p-4'>
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

    function FamilyList({ families }) {
        const listOfFamily = families.map((family) => {
            return (

                <tr key={family.userID}>
                    <td>{family.userID}</td>
                    <td>{family.firstName}</td>
                    <td>{family.lastName}</td>
                </tr>
            )
        });
        return (
            <div>
                <Container className='p-4'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Family's User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfFamily}
                        </tbody>
                    </Table>
                </Container>
            </div >
        )
    }

    function DoctorList({ doctors }) {
        const listOfDoctors = doctors.map((doctor) => {
            return (

                <tr key={doctor.userID}>
                    <td>{doctor.userID}</td>
                    <td>{doctor.firstName}</td>
                    <td>{doctor.lastName}</td>
                </tr>
            )
        });
        return (
            <div>
                <Container className='p-4'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Doctor's User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfDoctors}
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
                                <td>{resident.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <p>Family: </p>
                    <FamilyList families={fakefamily} />

                    <p>Doctor:  </p>
                    <DoctorList doctors={fakedoctor} />

                    <p>Current Prescription:</p>
                    <PrescriptionList prescriptions={prescriptions} />


                    <p>Location:
                        <li>Location ID: {location.LocationID} </li>
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

                    <div className="m-1">
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
                    <div>
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