import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from "react-router-dom";

const Resident = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("authenticated"));
    const [userType, setUserType] = useState(sessionStorage.getItem("userType"));
    const stateLoc = useLocation();
    const resident = stateLoc.state.resident;
    const user = stateLoc.state.user;
    const [prescriptions, setPrescriptions] = useState([]);
    const [family, setFamily] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [caretaker, setCaretaker] = useState([]);
    const [sensor, setSensor] = useState({});
    const [location, setLocation] = useState({});

    // Add / Edit Form for Prescription
    const [prescPrescriptionIDEdit, setPrescPrescriptionIDEdit] = useState("");
    const [prescMedicationNameEdit, setPrescMedicationNameEdit] = useState("");
    const [prescDoseEdit, setPrescDoseEdit] = useState("");
    const [prescFrequencyEdit, setPrescFrequencyEdit] = useState("");
    const [prescIntendedUseEdit, setPrescIntendedUseEdit] = useState("");
    const [prescInstructionsEdit, setPrescInstructionsEdit] = useState("");
    const [prescPrescriptionIDAdd, setPrescPrescriptionIDAdd] = useState("");
    const [prescMedicationNameAdd, setPrescMedicationNameAdd] = useState("");
    const [prescDoseAdd, setPrescDoseAdd] = useState("");
    const [prescFrequencyAdd, setPrescFrequencyAdd] = useState("");
    const [prescIntendedUseAdd, setPrescIntendedUseAdd] = useState("");
    const [prescInstructionsAdd, setPrescInstructionsAdd] = useState("");

    // Modal states
    const [openAddPrescModal, setOpenAddPrescModal] = useState(false)
    const [openEditPrescModal, setOpenEditPrescModal] = useState(false)

    const [fruitName, setFruitName] = useState("");
    const [fruitNutrition, setFruitNutrition] = useState("");

    useEffect(() => {
        getResidentDetails(resident.userID);
    }, []);

    function refreshPrescription() {
        fetch("/CareSense/api/prescription/resident/" + resident.userID)
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (JSON) {
                setPrescriptions(JSON)
            }).catch(err => {
                console.log(err);
                setPrescriptions([]);
            });
    }

    const handleSubmitPrescEdit = (e) => {
        e.preventDefault();

        let newData;
        newData = {
            userID: resident.userID, prescriptionID: prescPrescriptionIDEdit, medicationName: prescMedicationNameEdit,
            dose: prescDoseEdit, frequency: prescFrequencyEdit, intendedUse: prescIntendedUseEdit, instructions: prescInstructionsEdit
        };

        editData("prescription", prescPrescriptionIDEdit, newData);
        setOpenEditPrescModal(false);
    };

    const handleSubmitPrescAdd = (e) => {
        e.preventDefault();

        let newData;
        newData = {
            prescriptionID: prescPrescriptionIDAdd, userID: resident.userID, medicationName: prescMedicationNameAdd,
            dose: prescDoseAdd, frequency: prescFrequencyAdd, intendedUse: prescIntendedUseAdd, instructions: prescInstructionsAdd
        };

        addData("prescription", newData);
        setOpenAddPrescModal(false);
    };

    const handleSubmitFruitName = (e) => {
        e.preventDefault();
        getFruitNutrition(fruitName);
    };


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

    // Open the Edit Prescription Modal
    function openEditPrescForm(id, data) {
        console.log("Prescription open edit modal");
        console.log(data);
        setPrescPrescriptionIDEdit(data.prescriptionID);
        setPrescMedicationNameEdit(data.medicationName);
        setPrescDoseEdit(data.dose);
        setPrescFrequencyEdit(data.frequency);
        setPrescIntendedUseEdit(data.intendedUse);
        setPrescInstructionsEdit(data.instructions);
        setOpenEditPrescModal(true);
    }

    // Open the Add Associated Modal
    function openAddPrescForm(data) {
        console.log("Prescription open add modal");
        console.log(data);
        setPrescPrescriptionIDAdd("")
        setPrescMedicationNameAdd("");
        setPrescDoseAdd("");
        setPrescFrequencyAdd("");
        setPrescIntendedUseAdd("");
        setPrescInstructionsAdd("");
        setOpenAddPrescModal(true);
    }

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
                    {userType === "doctor" && (
                        <td>
                            <Button onClick={() => edit(prescription.prescriptionID, prescription)}>
                                Edit
                            </Button>
                            <Button onClick={() => deleteData("prescription", prescription.prescriptionID)} className="ms-1">
                                Delete
                            </Button>
                        </td>
                    )}
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
                                {userType === "doctor" && (<th>OPTIONS</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {listOfPrescription}
                        </tbody>
                    </Table>
                    {userType === "doctor" && (
                        <Button onClick={() => add()}>
                            Add Prescription
                        </Button>
                    )}
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


    // Access the API based on the button action and use POST Method
    // Requires the API name, data
    async function addData(api, data) {
        let address = "/CareSense/api/" + api;

        let newData = data;

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
                body: JSON.stringify(newData),
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
            console.log(result);
        } catch (err) {
            console.log(err.message);
        }

        refreshPrescription(); // Refresh

    }

    // Access the API based on the button action and use PUT Method
    // Requires the API name, id, data
    async function editData(api, id, data) {
        let address = "/CareSense/api/" + api + "/" + id;

        let currentData = data;

        try {
            const res = await fetch(address, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Origin": "http://localhost:8080",
                    "Access-Control-Request-Method": "PUT",
                    "Access-Control-Allow-Headers":
                        "Origin, X-Requested-With, Content-Type, Accept"
                },
                body: JSON.stringify(currentData),
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
            console.log(result);
        } catch (err) {
            console.log(err.message);
        }

        refreshPrescription(); // Refresh

    }

    // Access the API based on the button action and use DELETE Method
    // Requires the API name, id
    async function deleteData(api, id) {
        console.log(api + " delete " + id)
        let address = "/CareSense/api/" + api + "/" + id;

        try {
            const res = await fetch(address, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Origin": "http://localhost:8080",
                    "Access-Control-Request-Method": "DELETE",
                    "Access-Control-Allow-Headers":
                        "Origin, X-Requested-With, Content-Type, Accept"
                }
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
            const data = await res.json();
            const result = {
                status: res.status + "-" + res.statusText,
                headers: {
                    "Content-Length": res.headers.get("Content-Length"),
                    "Content-Type": "application/json",
                    "Access-Control-Request-Origin": "http://localhost:8080",
                    "Access-Control-Request-Method": "DELETE",
                    "Access-Control-Allow-Headers":
                        "Origin, X-Requested-With, Content-Type, Accept"
                },
                data: data,
            };
            console.log(result);
        } catch (err) {
            console.log(err.message);
        }

        refreshPrescription(); // Refresh

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

                    <p>{resident.firstName}'s Resident Page (ID: {resident.userID})</p>

                    <Table className="mt-5" striped bordered hover size="sm">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{resident.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{resident.lastName}</td>
                            </tr>
                            <tr>
                                <td>Birthday</td>
                                <td>{resident.birthday}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{resident.gender}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{resident.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <p>Family: </p>
                    <UserList usersAssociated={family} />

                    <p>Doctor:  </p>
                    <UserList usersAssociated={doctor} />

                    <p>Family:  </p>
                    <UserList usersAssociated={caretaker} />

                    <p>Current Prescription:</p>
                    <PrescriptionList prescriptions={prescriptions} edit={openEditPrescForm} add={openAddPrescForm} />

                    {userType === "caretaker" && ( // Only For Care Takers
                        <p>Location:
                            <li>Location ID: {location.LocationID} </li>
                            <li>Latitude: {location.latitude} </li>
                            <li>Longitude: {location.longitude} </li>
                            <li>Timestamp: {location.timestamp}</li>
                        </p>
                    )}

                    <p>Sensor:
                        <li>Sensor ID: {sensor.sensorID} </li>
                        <li>Blood Pressure: {sensor.bloodPressure} </li>
                        <li>Temperature: {sensor.temperature} F</li>
                        <li>Heart Rate: {sensor.heartrate} BPM</li>
                        <li>Glucose: {sensor.glucose} mg/dL</li>
                        <li>Oxygen Levels: {sensor.spO2} </li>
                        <li>Timestamp: {sensor.timestamp}</li>
                    </p>

                    <Modal show={openEditPrescModal} onHide={() => setOpenEditPrescModal(false)} animation={false}
                        style={{ overlay: { backgroundColor: 'grey' } }}>
                        <div className="d-flex justify-content-center">
                            <div className="m-5 justify-content-center">
                                <h4 className="mb-3 d-flex justify-content-center">Edit Prescription</h4>
                                <form onSubmit={handleSubmitPrescEdit}>
                                    <div className="mb-3">
                                        <label className="mb-1">Prescription ID</label>
                                        <input
                                            type="text"
                                            name="prescriptionID"
                                            className="form-control"
                                            value={prescPrescriptionIDEdit}
                                            onChange={(e) => setPrescPrescriptionIDEdit(e.target.value)}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Prescription Name</label>
                                        <input
                                            type="text"
                                            name="Name"
                                            className="form-control"
                                            value={prescMedicationNameEdit}
                                            onChange={(e) => setPrescMedicationNameEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Dosage</label>
                                        <input
                                            type="text"
                                            name="Dosage"
                                            className="form-control"
                                            value={prescDoseEdit}
                                            onChange={(e) => setPrescDoseEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Frequency</label>
                                        <input
                                            type="text"
                                            name="Frequency"
                                            className="form-control"
                                            value={prescFrequencyEdit}
                                            onChange={(e) => setPrescFrequencyEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Intended Use</label>
                                        <input
                                            type="text"
                                            name="intendedUse"
                                            className="form-control"
                                            value={prescIntendedUseEdit}
                                            onChange={(e) => setPrescIntendedUseEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Instructions</label>
                                        <input
                                            type="text"
                                            name="Instructions"
                                            className="form-control"
                                            value={prescInstructionsEdit}
                                            onChange={(e) => setPrescInstructionsEdit(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </Modal>

                    <Modal show={openAddPrescModal} onHide={() => setOpenAddPrescModal(false)} animation={false}
                        style={{ overlay: { backgroundColor: 'grey' } }}>
                        <div className="d-flex justify-content-center">
                            <div className="m-5 justify-content-center">
                                <h4 className="mb-3 d-flex justify-content-center">Add Prescription</h4>
                                <form onSubmit={handleSubmitPrescAdd}>
                                    <div className="mb-3">
                                        <label className="mb-1">Prescription ID</label>
                                        <input
                                            type="text"
                                            name="Name"
                                            className="form-control"
                                            value={prescPrescriptionIDAdd}
                                            onChange={(e) => setPrescPrescriptionIDAdd(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Prescription Name</label>
                                        <input
                                            type="text"
                                            name="Name"
                                            className="form-control"
                                            value={prescMedicationNameAdd}
                                            onChange={(e) => setPrescMedicationNameAdd(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Dosage</label>
                                        <input
                                            type="text"
                                            name="Dosage"
                                            className="form-control"
                                            value={prescDoseAdd}
                                            onChange={(e) => setPrescDoseAdd(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Frequency</label>
                                        <input
                                            type="text"
                                            name="Frequency"
                                            className="form-control"
                                            value={prescFrequencyAdd}
                                            onChange={(e) => setPrescFrequencyAdd(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">intendedUse</label>
                                        <input
                                            type="text"
                                            name="intendedUse"
                                            className="form-control"
                                            value={prescIntendedUseAdd}
                                            onChange={(e) => setPrescIntendedUseAdd(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Instructions</label>
                                        <input
                                            type="text"
                                            name="Instructions"
                                            className="form-control"
                                            value={prescInstructionsAdd}
                                            onChange={(e) => setPrescInstructionsAdd(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </Modal>

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



export default Resident;