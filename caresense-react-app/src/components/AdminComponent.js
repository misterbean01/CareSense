import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Admin = () => {
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("authenticated"));
    const [userType, setUserType] = useState(sessionStorage.getItem("userType"));
    const [users, setUsers] = useState([]);
    const [associatedResidents, setAssociatedResidents] = useState([]);
    const [residentUsers, setResidentUsers] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [locations, setLocations] = useState([]);

    const [itemIDEdit, setItemIDEdit] = useState("");
    const [itemIDAdd, setItemIDAdd] = useState("");

    // Edit Form for User / Resident
    const [userTypeEdit, setUserTypeEdit] = useState("");
    const [usernameEdit, setUsernameEdit] = useState("");
    const [passwordEdit, setPasswordEdit] = useState("");
    const [firstNameEdit, setFirstNameEdit] = useState("");
    const [lastNameEdit, setLastNameEdit] = useState("");
    const [genderEdit, setGenderEdit] = useState("");
    const [birthdayEdit, setBirthdayEdit] = useState("");
    const [phoneNumberEdit, setPhoneNumberEdit] = useState("");
    const [sensorIDEdit, setSensorIDEdit] = useState("");
    const [locationIDEdit, setLocationIDEdit] = useState("");

    // Add Form for User / Resident
    const [userTypeAdd, setUserTypeAdd] = useState("");
    const [usernameAdd, setUsernameAdd] = useState("");
    const [passwordAdd, setPasswordAdd] = useState("");
    const [firstNameAdd, setFirstNameAdd] = useState("");
    const [lastNameAdd, setLastNameAdd] = useState("");
    const [genderAdd, setGenderAdd] = useState("");
    const [birthdayAdd, setBirthdayAdd] = useState("");
    const [phoneNumberAdd, setPhoneNumberAdd] = useState("");
    const [sensorIDAdd, setSensorIDAdd] = useState("");
    const [locationIDAdd, setLocationIDAdd] = useState("");

    // Add / Edit Form for Associated
    const [associatedResidentIDAdd, setAssociatedResidentIDAdd] = useState("");
    const [associatedUserIDAdd, setAssociatedUserIDAdd] = useState("");
    const [associatedResidentIDEdit, setAssociatedResidentIDEdit] = useState("");
    const [associatedUserIDEdit, setAssociatedUserIDEdit] = useState("");

    // Add / Edit Form for Location
    const [locLatitudeEdit, setLocLatitudeEdit] = useState("");
    const [locLongitudeEdit, setLocLongitudeEdit] = useState("");
    const [locTimestampEdit, seTLocTimestampEdit] = useState("");
    const [locLatitudeAdd, setLocLatitudeAdd] = useState("");
    const [locLongitudeAdd, setLocLongitudeAdd] = useState("");
    const [locTimestampAdd, seTLocTimestampAdd] = useState("");

    // Add / Edit Form for Sensor
    const [bloodPressureEdit, setBloodPressureEdit] = useState("");
    const [temperatureEdit, setTemperatureEdit] = useState("");
    const [heartrateEdit, setHeartrateEdit] = useState("");
    const [glucoseEdit, setGlucoseEdit] = useState("");
    const [spO2Edit, setSpO2Edit] = useState("");
    const [sensorTimestampEdit, setSensorTimestampEdit] = useState("");
    const [bloodPressureAdd, setBloodPressureAdd] = useState("");
    const [temperatureAdd, setTemperatureAdd] = useState("");
    const [heartrateAdd, setHeartrateAdd] = useState("");
    const [glucoseAdd, setGlucoseAdd] = useState("");
    const [spO2Add, setSpO2Add] = useState("");
    const [sensorTimestampAdd, setSensorTimestampAdd] = useState("");

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
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openAddResModal, setOpenAddResModal] = useState(false)
    const [openEditResModal, setOpenEditResModal] = useState(false)
    const [openAddAssociatedModal, setOpenAddAssociatedModal] = useState(false)
    const [openEditAssociatedModal, setOpenEditAssociatedModal] = useState(false)
    const [openAddPrescModal, setOpenAddPrescModal] = useState(false)
    const [openEditPrescModal, setOpenEditPrescModal] = useState(false)
    const [openAddLocModal, setOpenAddLocModal] = useState(false)
    const [openEditLocModal, setOpenEditLocModal] = useState(false)
    const [openAddSensorModal, setOpenAddSensorModal] = useState(false)
    const [openEditSensorModal, setOpenEditSensorModal] = useState(false)

    const navigate = useNavigate();
    const stateLoc = useLocation();
    const user = stateLoc.state.user;

    useEffect(() => {
        refreshPrescription();
        refreshUser();
        refreshLocation();
        refreshSensor();
        refreshResident();
        refreshAssociated();
    }, []);

    function refreshPrescription() {
        fetch("/CareSense/api/prescription/")
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

    function refreshUser() {
        fetch("/CareSense/api/user/all")
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (JSON) {
                setUsers(JSON)
            }).catch(err => {
                console.log(err);
                setUsers([]);
            });
    }

    function refreshLocation() {
        fetch("/CareSense/api/location/all")
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (JSON) {
                setLocations(JSON)
            }).catch(err => {
                console.log(err);
                setLocations([]);
            });
    }

    function refreshSensor() {
        fetch("/CareSense/api/sensor/all")
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (JSON) {
                setSensors(JSON)
            }).catch(err => {
                console.log(err);
                setSensors([]);
            });
    }

    function refreshResident() {
        fetch("/CareSense/api/residentTracker/all")
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (JSON) {
                setResidentUsers(JSON)
            }).catch(err => {
                console.log(err);
                setResidentUsers([]);
            });
    }

    function refreshAssociated() {
        fetch("/CareSense/api/associated/all")
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (JSON) {
                setAssociatedResidents(JSON)
            }).catch(err => {
                console.log(err);
                setAssociatedResidents([]);
            });
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();

        // create if statement depending on account type (Family, Doctor, Caretaker, Admin)
        // ADD THE ACCOUNT TO THE DATABASE
        let newData;
        newData = {
            userID: itemIDEdit, firstName: firstNameEdit, lastName: lastNameEdit,
            username: usernameEdit, password: passwordEdit, userType: userTypeEdit,
            gender: genderEdit, birthday: birthdayEdit, phoneNumber: phoneNumberEdit
        };

        editData("user", itemIDEdit, newData);
        setOpenEditModal(false);
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();

        // create if statement depending on account type (Family, Doctor, Caretaker, Admin)
        // ADD THE ACCOUNT TO THE DATABASE
        let newData = {
            userID: itemIDAdd, firstName: firstNameAdd, lastName: lastNameAdd,
            username: usernameAdd, password: passwordAdd, userType: userTypeAdd,
            gender: genderAdd, birthday: birthdayAdd, phoneNumber: phoneNumberAdd
        };


        addData("user", newData);
        setOpenAddModal(false);
    };

    const handleSubmitResEdit = (e) => {
        e.preventDefault();

        // create if statement depending on Residents
        // ADD THE ACCOUNT TO THE DATABASE
        let newData = {
            sensorID: sensorIDEdit, locationID: sensorIDEdit, userID: itemIDEdit
        };

        editData("residentTracker", itemIDEdit, newData);
        setOpenEditResModal(false);
    };

    const handleSubmitResAdd = (e) => {
        e.preventDefault();

        // create if statement depending on Residents
        // ADD THE ACCOUNT TO THE DATABASE
        let newData = {
            sensorID: sensorIDAdd, locationID: locationIDAdd, userID: itemIDAdd
        };

        addData("residentTracker", newData);
        setOpenAddResModal(false);
    };

    const handleSubmitLocEdit = (e) => {
        e.preventDefault();

        // ADD THE ACCOUNT TO THE DATABASE
        let newData = {
            locationID: itemIDEdit, longitude: locLatitudeEdit, latitude: locLatitudeEdit,
            timestamp: locTimestampEdit
        };

        editData("location", itemIDEdit, newData);
        setOpenEditLocModal(false);
    };

    const handleSubmitLocAdd = (e) => {
        e.preventDefault();

        // ADD THE ACCOUNT TO THE DATABASE
        let newData = {
            locationID: itemIDAdd, longitude: locLatitudeAdd, latitude: locLatitudeAdd,
            timestamp: locTimestampAdd
        };

        addData("location", newData);
        setOpenAddLocModal(false);
    };

    const handleSubmitSensorEdit = (e) => {
        e.preventDefault();

        // ADD THE ACCOUNT TO THE DATABASE
        let newData = {
            sensorID: itemIDEdit, bloodPressure: bloodPressureEdit, temperature: temperatureEdit,
            heartrate: heartrateEdit, glucose: glucoseEdit, spO2: spO2Edit, timestamp: sensorTimestampEdit
        };

        editData("sensor", itemIDEdit, newData);
        setOpenEditSensorModal(false);
    };

    const handleSubmitSensorAdd = (e) => {
        e.preventDefault();

        // ADD THE ACCOUNT TO THE DATABASE
        let newData = {
            sensorID: itemIDAdd, bloodPressure: bloodPressureAdd, temperature: temperatureAdd,
            heartrate: heartrateAdd, glucose: glucoseAdd, spO2: spO2Add, timestamp: sensorTimestampAdd
        };

        addData("sensor", newData);
        setOpenAddSensorModal(false);
    };

    const handleSubmitAssociatedEdit = (e) => {
        e.preventDefault();

        let newData;
        newData = {
            uniqueID: itemIDEdit, associatedUserID: associatedUserIDEdit, userID: associatedResidentIDEdit,
        };

        editData("associated", itemIDEdit, newData);
        setOpenEditAssociatedModal(false);
    };

    const handleSubmitAssociatedAdd = (e) => {
        e.preventDefault();

        let newData = {
            uniqueID: itemIDAdd, associatedUserID: associatedUserIDAdd, userID: associatedResidentIDAdd,
        };

        addData("associated", newData);
        setOpenAddAssociatedModal(false);
    };

    const handleSubmitPrescEdit = (e) => {
        e.preventDefault();

        let newData;
        newData = {
            userID: itemIDEdit, prescriptionID: prescPrescriptionIDEdit, medicationName: prescMedicationNameEdit,
            dose: prescDoseEdit, frequency: prescFrequencyEdit, intendedUse: prescIntendedUseEdit, instructions: prescInstructionsEdit
        };

        editData("prescription", prescPrescriptionIDEdit, newData);
        refreshPrescription();
        setOpenEditPrescModal(false);
    };

    const handleSubmitPrescAdd = (e) => {
        e.preventDefault();

        let newData;
        newData = {
            prescriptionID: prescPrescriptionIDAdd, userID: itemIDAdd, medicationName: prescMedicationNameAdd,
            dose: prescDoseAdd, frequency: prescFrequencyAdd, intendedUse: prescIntendedUseAdd, instructions: prescInstructionsAdd
        };

        addData("prescription", newData);
        refreshPrescription();
        setOpenAddPrescModal(false);
    };


    // Open the Edit Model for User
    function openEditForm(data) {
        console.log(data.userType + " open edit modal");
        console.log(data);
        setItemIDEdit(data.userID);
        setUsernameEdit(data.username);
        setPasswordEdit(data.password);
        setUserTypeEdit(data.userType);
        setFirstNameEdit(data.firstName);
        setLastNameEdit(data.lastName);
        setBirthdayEdit(data.birthday);
        setPhoneNumberEdit(data.phoneNumber);
        setGenderEdit(data.gender);
        setOpenEditModal(true);
    }

    // Open the Add Model for User
    function openAddForm() {
        setItemIDAdd("");
        setUserTypeAdd("");
        setUsernameAdd("");
        setPasswordAdd("");
        setFirstNameAdd("")
        setLastNameAdd("")
        setBirthdayAdd("");
        setPhoneNumberAdd("");
        setGenderAdd("");
        setOpenAddModal(true);
    }

    // Open the Edit Model for Resident
    function openEditResForm(id, data) {
        console.log(id + " open edit modal");
        console.log(data);
        setItemIDEdit(id);
        setLocationIDEdit(data.locationID);
        setSensorIDEdit(data.sensorID);
        setOpenEditResModal(true);
    }

    // Open the Add Model for Resident
    function openAddResForm() {
        setLocationIDAdd("");
        setSensorIDAdd("");
        setOpenAddResModal(true);
    }

    // Open the Edit Model for Location
    function openEditLocForm(id, data) {
        console.log(id + " open edit modal");
        console.log(data);
        setItemIDEdit(id);
        setLocLatitudeEdit(data.latitude);
        setLocLongitudeEdit(data.longitude);
        seTLocTimestampEdit(data.timestamp);
        setOpenEditLocModal(true);
    }

    // Open the Add Model for Resident
    function openAddLocForm() {
        setItemIDAdd("");
        setLocLatitudeAdd("");
        setLocLongitudeAdd("");
        seTLocTimestampAdd("");
        setOpenAddLocModal(true);
    }

    // Open the Edit Model for Location
    function openEditSensorForm(id, data) {
        console.log(id + " open edit modal");
        console.log(data);
        setItemIDEdit(id);
        setBloodPressureEdit(data.bloodPressure);
        setTemperatureEdit(data.temperature);
        setHeartrateEdit(data.heartrate);
        setGlucoseEdit(data.glucose);
        setSpO2Edit(data.spO2);
        setSensorTimestampEdit(data.timestamp);
        setOpenEditSensorModal(true);
    }

    // Open the Add Model for Resident
    function openAddSensorForm() {
        setItemIDAdd("");
        setBloodPressureAdd("");
        setTemperatureAdd("");
        setHeartrateAdd("");
        setGlucoseAdd("");
        setSpO2Add("");
        setSensorTimestampAdd("");
        setOpenAddSensorModal(true);
    }

    // Open the Edit Associated Modal
    function openEditAssociatedForm(id, data) {
        console.log("assoicated open edit modal");
        console.log(data);
        setItemIDEdit(id);
        setAssociatedResidentIDEdit(data.userID);
        setAssociatedUserIDEdit(data.associatedUserID);
        setOpenEditAssociatedModal(true);
    }

    // Open the Add Associated Modal
    function openAddAssociatedForm(data) {
        console.log("assoicated open add modal");
        console.log(data);
        setItemIDAdd("");
        setAssociatedResidentIDAdd("");
        setAssociatedUserIDAdd("");
        setOpenAddAssociatedModal(true);
    }

    // Open the Edit Prescription Modal
    function openEditPrescForm(id, data) {
        console.log("Prescription open edit modal");
        console.log(data);
        setItemIDEdit(id);
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
        setItemIDAdd("")
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
                    <td>{prescription.userID}</td>
                    <td>{prescription.medicationName}</td>
                    <td>{prescription.dose}</td>
                    <td>{prescription.frequency}</td>
                    <td>{prescription.intendedUse}</td>
                    <td>{prescription.instructions}</td>

                    <td>
                        <Button onClick={() => edit(prescription.prescriptionID, prescription)}>
                            Edit
                        </Button>
                        <Button onClick={() => deleteData("prescription", prescription.prescriptionID)} className="ms-1">
                            Delete
                        </Button>
                    </td>

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
                                <th>User ID</th>
                                <th>Prescription Name</th>
                                <th>Dose</th>
                                <th>Frequency</th>
                                <th>Intended Use</th>
                                <th>Instructions</th>
                                <th>OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfPrescription}
                        </tbody>
                    </Table>

                    <Button onClick={() => add()}>
                        Add Prescription
                    </Button>
                </Container>
            </div >
        )
    }

    // Table Component inside a Map For Each Resident
    function ResidentList({ residentUsers, edit, add }) {
        const listOfResidents = residentUsers.map((resident) => {
            return (

                <tr key={resident.userID}>
                    <td>{resident.userID}</td>
                    <td>{resident.sensorID}</td>
                    <td>{resident.locationID}</td>
                    <td>
                        <Button onClick={() => edit(resident.userID, resident)}>
                            Edit
                        </Button>
                        <Button onClick={() => deleteData("residentTracker", resident.userID)} className="ms-1">
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <Container className='p-4'>
                    <p>Resident List</p>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Sensor ID</th>
                                <th>Location ID</th>
                                <th>OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfResidents}
                        </tbody>
                    </Table>
                    <Button onClick={() => add()}>
                        Add Resident
                    </Button>
                </Container>
            </div >
        )
    }

    // Table Component inside a Map For Each Users
    function UserList({ users, edit, add }) {
        const listOfUsers = users.map((user) => {
            return (

                <tr key={user.userID}>
                    <td>{user.userID}</td>
                    <td>{user.userType}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.birthday}</td>
                    <td>{user.gender}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                        <Button onClick={() => edit(user)}>
                            Edit
                        </Button>
                        <Button onClick={() => deleteData("user", user.userID)} className="ms-1">
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <Container className='p-4'>
                    <p>User List</p>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Type</th>
                                <th>First Name</th>
                                <th>Last name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Birthday</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                                <th>OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfUsers}
                        </tbody>
                    </Table>
                    <Button onClick={() => add()}>
                        Add User
                    </Button>
                </Container>
            </div >
        )
    }

    // Table Component inside a Map For Each Association
    function AssociatedResidentList({ associatedResidents, edit, add }) {
        const listOfAssociatedResidents = associatedResidents.map((associated) => {
            return (
                <tr key={associated.uniqueID}>
                    <td>{associated.uniqueID}</td>
                    <td>{associated.userID}</td>
                    <td>{associated.associatedUserID}</td>
                    <td>
                        <Button onClick={() => edit(associated.uniqueID, associated)}>
                            Edit
                        </Button>
                        <Button onClick={() => deleteData("associated", associated.uniqueID)} className="ms-1">
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <Container className='p-4'>
                    <p>Assocaition List</p>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Unique ID</th>
                                <th>Resident ID</th>
                                <th>User ID</th>
                                <th>OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfAssociatedResidents}
                        </tbody>
                    </Table>
                    <Button onClick={() => add()}>
                        Add Associated Residents
                    </Button>
                </Container>
            </div >
        )
    }

    // Table Component inside a Map For Each Location
    function LocationList({ locations, edit, add }) {
        const listOfLocation = locations.map((location) => {
            return (
                <tr key={location.locationID}>
                    <td>{location.locationID}</td>
                    <td>{location.latitude}</td>
                    <td>{location.longitude}</td>
                    <td>{location.timestamp}</td>
                    <td>
                        <Button onClick={() => edit(location.locationID, location)}>
                            Edit
                        </Button>
                        <Button onClick={() => deleteData("location", location.locationID)} className="ms-1">
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <Container className='p-4'>
                    <p>Location List</p>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Location ID</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Timestamp</th>
                                <th>OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfLocation}
                        </tbody>
                    </Table>
                    <Button onClick={() => add()}>
                        Add Location
                    </Button>
                </Container>
            </div >
        )
    }

    // Table Component inside a Map For Each Sensors
    function SensorList({ sensors, edit, add }) {
        const listOfSensors = sensors.map((sensor) => {
            return (
                <tr key={sensor.sensorID}>
                    <td>{sensor.sensorID}</td>
                    <td>{sensor.bloodPressure}</td>
                    <td>{sensor.temperature}</td>
                    <td>{sensor.heartrate}</td>
                    <td>{sensor.glucose}</td>
                    <td>{sensor.spO2}</td>
                    <td>{sensor.timestamp}</td>
                    <td>
                        <Button onClick={() => edit(sensor.sensorID, sensor)}>
                            Edit
                        </Button>
                        <Button onClick={() => deleteData("sensor", sensor.sensorID)} className="ms-1">
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <Container className='p-4'>
                    <p>Sensor List</p>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Sensor ID</th>
                                <th>Blood Pressure</th>
                                <th>Temperature</th>
                                <th>Heart rate</th>
                                <th>Glucose</th>
                                <th>Oxygen Level</th>
                                <th>Timestamp</th>
                                <th>OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfSensors}
                        </tbody>
                    </Table>
                    <Button onClick={() => add()}>
                        Add Sensor
                    </Button>
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
                data: data
            };
            if (api === "prescription") refreshPrescription();
            if (api === "user") refreshUser();
            if (api === "location") refreshLocation();
            if (api === "sensor") refreshSensor();
            if (api === "residentTracker") refreshResident();
            if (api === "associated") refreshAssociated();
            console.log(result);
        } catch (err) {
            console.log(err.message);
        }
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
                data: data
            };
            if (api === "prescription") refreshPrescription();
            if (api === "user") refreshUser();
            if (api === "location") refreshLocation();
            if (api === "sensor") refreshSensor();
            if (api === "residentTracker") refreshResident();
            if (api === "associated") refreshAssociated();
            console.log(result);
        } catch (err) {
            console.log(err.message);
        }
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
            if (api === "prescription") refreshPrescription();
            if (api === "user") refreshUser();
            if (api === "location") refreshLocation();
            if (api === "sensor") refreshSensor();
            if (api === "residentTracker") refreshResident();
            if (api === "associated") refreshAssociated();
            console.log(res);
        } catch (err) {
            console.log(err.message);
        }
    }

    if (!authenticated && userType !== "admin") {
        return <Navigate replace to="/login" />; // redirect to the login page if not authenticated
    } else {
        return (
            <div>
                <p>Welcome to Care Sense Admin, {user.username}, ID: {user.userID} <Button onClick={() => {
                    sessionStorage.setItem("authenticated", false);
                    sessionStorage.setItem("userType", "");
                    console.log("Logout Successful");
                    navigate("/login");
                }}>
                    Logout
                </Button>
                </p>

                <UserList users={users} edit={openEditForm} add={openAddForm} />

                <AssociatedResidentList associatedResidents={associatedResidents} edit={openEditAssociatedForm} add={openAddAssociatedForm} />

                <ResidentList residentUsers={residentUsers} edit={openEditResForm} add={openAddResForm} />

                <LocationList locations={locations} edit={openEditLocForm} add={openAddLocForm} />

                <SensorList sensors={sensors} edit={openEditSensorForm} add={openAddSensorForm} />

                <PrescriptionList prescriptions={prescriptions} edit={openEditPrescForm} add={openAddPrescForm} />

                <Modal show={openEditModal} onHide={() => setOpenEditModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">User Edit</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitEdit}>
                                <div className="mb-3">
                                    <label className="mb-1">Username</label>
                                    <input
                                        type="text"
                                        name="Username"
                                        className="form-control"
                                        value={usernameEdit}
                                        onChange={(e) => setUsernameEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Password</label>
                                    <input
                                        type="text"
                                        name="Password"
                                        className="form-control"
                                        value={passwordEdit}
                                        onChange={(e) => setPasswordEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="FirstName"
                                        className="form-control"
                                        value={firstNameEdit}
                                        onChange={(e) => setFirstNameEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="LastName"
                                        className="form-control"
                                        value={lastNameEdit}
                                        onChange={(e) => setLastNameEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Birthday</label>
                                    <input
                                        type="text"
                                        name="Birthday"
                                        className="form-control"
                                        value={birthdayEdit}
                                        onChange={(e) => setBirthdayEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Gender</label>
                                    <input
                                        type="text"
                                        name="Gender"
                                        className="form-control"
                                        value={genderEdit}
                                        onChange={(e) => setPhoneNumberEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="PhoneNumber"
                                        className="form-control"
                                        value={phoneNumberEdit}
                                        onChange={(e) => setPhoneNumberEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <p>User Type: {userTypeEdit} </p>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openAddModal} onHide={() => setOpenAddModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">Add User</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitAdd}>
                                <div className="mb-3">
                                    <label className="mb-1">User ID</label>
                                    <input
                                        type="text"
                                        name="userID"
                                        className="form-control"
                                        value={itemIDAdd}
                                        onChange={(e) => setItemIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Username</label>
                                    <input
                                        type="text"
                                        name="Username"
                                        className="form-control"
                                        value={usernameAdd}
                                        onChange={(e) => setUsernameAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Password</label>
                                    <input
                                        type="text"
                                        name="Password"
                                        className="form-control"
                                        value={passwordAdd}
                                        onChange={(e) => setPasswordAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="FirstName"
                                        className="form-control"
                                        value={firstNameAdd}
                                        onChange={(e) => setFirstNameAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="LastName"
                                        className="form-control"
                                        value={lastNameAdd}
                                        onChange={(e) => setLastNameAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Birthday</label>
                                    <input
                                        type="text"
                                        name="Birthday"
                                        className="form-control"
                                        value={birthdayAdd}
                                        onChange={(e) => setBirthdayAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Gender</label>
                                    <input
                                        type="text"
                                        name="Gender"
                                        className="form-control"
                                        value={genderAdd}
                                        onChange={(e) => setGenderAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="PhoneNumber"
                                        className="form-control"
                                        value={phoneNumberAdd}
                                        onChange={(e) => setPhoneNumberAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="label">Select Account Type</label>
                                    <select onChange={(e) => setUserTypeAdd(e.target.value)} defaultValue="" className="form-control">
                                        <option>Select User Type</option>
                                        <option value="caretaker">Caretaker</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="familyMember">Family</option>
                                        <option value="resident">Resident</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openEditResModal} onHide={() => setOpenEditResModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">Resident Detail Edit</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitResEdit}>
                                <div className="mb-3">
                                    <label className="mb-1">User ID</label>
                                    <input
                                        type="text"
                                        name="userID"
                                        className="form-control"
                                        value={itemIDEdit}
                                        onChange={(e) => setItemIDEdit(e.target.value)}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Sensor ID</label>
                                    <input
                                        type="text"
                                        name="SensorID"
                                        className="form-control"
                                        value={sensorIDEdit}
                                        onChange={(e) => setSensorIDEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Location ID</label>
                                    <input
                                        type="text"
                                        name="LocationID"
                                        className="form-control"
                                        value={locationIDEdit}
                                        onChange={(e) => setLocationIDEdit(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openAddResModal} onHide={() => setOpenAddResModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">Resident Detail Add</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitResAdd}>
                                <div className="mb-3">
                                    <label className="mb-1">User ID</label>
                                    <input
                                        type="text"
                                        name="userID"
                                        className="form-control"
                                        value={itemIDAdd}
                                        onChange={(e) => setItemIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Sensor ID</label>
                                    <input
                                        type="text"
                                        name="SensorID"
                                        className="form-control"
                                        value={sensorIDAdd}
                                        onChange={(e) => setSensorIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Location ID</label>
                                    <input
                                        type="text"
                                        name="LocationID"
                                        className="form-control"
                                        value={locationIDAdd}
                                        onChange={(e) => setLocationIDAdd(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openEditLocModal} onHide={() => setOpenEditLocModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">Location Edit</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitLocEdit}>
                                <div className="mb-3">
                                    <label className="mb-1">Location ID</label>
                                    <input
                                        type="text"
                                        name="locationID"
                                        className="form-control"
                                        value={itemIDEdit}
                                        onChange={(e) => setItemIDEdit(e.target.value)}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Latitude</label>
                                    <input
                                        type="text"
                                        name="Latitude"
                                        className="form-control"
                                        value={locLatitudeEdit}
                                        onChange={(e) => setLocLatitudeEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Longitude</label>
                                    <input
                                        type="text"
                                        name="Longitude"
                                        className="form-control"
                                        value={locLongitudeEdit}
                                        onChange={(e) => setLocLongitudeEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Timestamp</label>
                                    <input
                                        type="text"
                                        name="Timestamp"
                                        className="form-control"
                                        value={locTimestampEdit}
                                        onChange={(e) => seTLocTimestampEdit(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openAddLocModal} onHide={() => setOpenAddLocModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">Location Add</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitLocAdd}>
                                <div className="mb-3">
                                    <label className="mb-1">Location ID</label>
                                    <input
                                        type="text"
                                        name="locationID"
                                        className="form-control"
                                        value={itemIDAdd}
                                        onChange={(e) => setItemIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Latitude</label>
                                    <input
                                        type="text"
                                        name="Latitude"
                                        className="form-control"
                                        value={locLatitudeAdd}
                                        onChange={(e) => setLocLatitudeAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Longitude</label>
                                    <input
                                        type="text"
                                        name="Longitude"
                                        className="form-control"
                                        value={locLongitudeAdd}
                                        onChange={(e) => setLocLongitudeAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Timestamp</label>
                                    <input
                                        type="text"
                                        name="Timestamp"
                                        className="form-control"
                                        value={locTimestampAdd}
                                        onChange={(e) => seTLocTimestampAdd(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openEditSensorModal} onHide={() => setOpenEditSensorModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">Sensor Edit</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitSensorEdit}>
                                <div className="mb-3">
                                    <label className="mb-1">Sensor ID</label>
                                    <input
                                        type="text"
                                        name="sensorID"
                                        className="form-control"
                                        value={itemIDEdit}
                                        onChange={(e) => setItemIDEdit(e.target.value)}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Blood Pressure</label>
                                    <input
                                        type="text"
                                        name="bloodPressure"
                                        className="form-control"
                                        value={bloodPressureEdit}
                                        onChange={(e) => setBloodPressureEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Temperature</label>
                                    <input
                                        type="text"
                                        name="temperature"
                                        className="form-control"
                                        value={temperatureEdit}
                                        onChange={(e) => setTemperatureEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Heart Rate</label>
                                    <input
                                        type="text"
                                        name="heartrate"
                                        className="form-control"
                                        value={heartrateEdit}
                                        onChange={(e) => setHeartrateEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Glucose</label>
                                    <input
                                        type="text"
                                        name="Glucose"
                                        className="form-control"
                                        value={glucoseEdit}
                                        onChange={(e) => setGlucoseEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Oxygen Level</label>
                                    <input
                                        type="text"
                                        name="spO2"
                                        className="form-control"
                                        value={spO2Edit}
                                        onChange={(e) => setSpO2Edit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Timestamp</label>
                                    <input
                                        type="text"
                                        name="Timestamp"
                                        className="form-control"
                                        value={sensorTimestampEdit}
                                        onChange={(e) => setSensorTimestampEdit(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openAddSensorModal} onHide={() => setOpenAddSensorModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">Sensor Add</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitSensorAdd}>
                                <div className="mb-3">
                                    <label className="mb-1">Sensor ID</label>
                                    <input
                                        type="text"
                                        name="sensorID"
                                        className="form-control"
                                        value={itemIDAdd}
                                        onChange={(e) => setItemIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Blood Pressure</label>
                                    <input
                                        type="text"
                                        name="bloodPressure"
                                        className="form-control"
                                        value={bloodPressureAdd}
                                        onChange={(e) => setBloodPressureAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Temperature</label>
                                    <input
                                        type="text"
                                        name="temperature"
                                        className="form-control"
                                        value={temperatureAdd}
                                        onChange={(e) => setTemperatureAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Heart Rate</label>
                                    <input
                                        type="text"
                                        name="heartrate"
                                        className="form-control"
                                        value={heartrateAdd}
                                        onChange={(e) => setHeartrateAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Glucose</label>
                                    <input
                                        type="text"
                                        name="Glucose"
                                        className="form-control"
                                        value={glucoseAdd}
                                        onChange={(e) => setGlucoseAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Oxygen Level</label>
                                    <input
                                        type="text"
                                        name="spO2"
                                        className="form-control"
                                        value={spO2Add}
                                        onChange={(e) => setSpO2Add(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Timestamp</label>
                                    <input
                                        type="text"
                                        name="Timestamp"
                                        className="form-control"
                                        value={sensorTimestampAdd}
                                        onChange={(e) => setSensorTimestampAdd(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openEditAssociatedModal} onHide={() => setOpenEditAssociatedModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">Associated Edit</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitAssociatedEdit}>
                                <div className="mb-3">
                                    <label className="mb-1">Unique ID</label>
                                    <input
                                        type="text"
                                        name="uniqueID"
                                        className="form-control"
                                        value={itemIDEdit}
                                        onChange={(e) => setItemIDEdit(e.target.value)}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Resident ID</label>
                                    <input
                                        type="text"
                                        name="ResidentID"
                                        className="form-control"
                                        value={associatedResidentIDEdit}
                                        onChange={(e) => setAssociatedResidentIDEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">UserID</label>
                                    <input
                                        type="text"
                                        name="UserID"
                                        className="form-control"
                                        value={associatedUserIDEdit}
                                        onChange={(e) => setAssociatedUserIDEdit(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openAddAssociatedModal} onHide={() => setOpenAddAssociatedModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">Associated Add</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitAssociatedAdd}>
                                <div className="mb-3">
                                    <label className="mb-1">Unique ID</label>
                                    <input
                                        type="text"
                                        name="ResidentID"
                                        className="form-control"
                                        value={itemIDAdd}
                                        onChange={(e) => setItemIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Resident ID</label>
                                    <input
                                        type="text"
                                        name="ResidentID"
                                        className="form-control"
                                        value={associatedResidentIDAdd}
                                        onChange={(e) => setAssociatedResidentIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">User ID</label>
                                    <input
                                        type="text"
                                        name="UserID"
                                        className="form-control"
                                        value={associatedUserIDAdd}
                                        onChange={(e) => setAssociatedUserIDAdd(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

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
                                    <label className="mb-1">User ID</label>
                                    <input
                                        type="text"
                                        name="Name"
                                        className="form-control"
                                        value={itemIDEdit}
                                        onChange={(e) => setItemIDEdit(e.target.value)}
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
                                    <label className="mb-1">User ID</label>
                                    <input
                                        type="text"
                                        name="userID"
                                        className="form-control"
                                        value={itemIDAdd}
                                        onChange={(e) => setItemIDAdd(e.target.value)}
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

            </div>
        );
    }
}

export default Admin;