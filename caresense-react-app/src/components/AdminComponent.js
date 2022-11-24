import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const Admin = () => {
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("authenticated"));
    const [accountType, setAccountType] = useState(sessionStorage.getItem("accountType"));
    const [residents, setResidents] = useState([
        { ResidentID: 1, Fname: "Harold", Lname: "Hide", Sex: "Male", Age: 70, FamilyID: 1, DoctorID: 1, SensorID: 1, LocationID: 1, CareInstructions: "Morning Exercises for 10 minutes." },
        { ResidentID: 2, Fname: "Lisa", Lname: "Lisa", Sex: "Female", Age: 70, FamilyID: 2, DoctorID: 2, SensorID: 2, LocationID: 2, CareInstructions: "Sleep 8 hours a day." },
        { ResidentID: 3, Fname: "Rodger", Lname: "Hide", Sex: "Male", Age: 72, FamilyID: 1, DoctorID: 3, SensorID: 3, LocationID: 1, CareInstructions: "Drink Water every 4 hours." },
        { ResidentID: 4, Fname: "Ann", Lname: "Tony", Sex: "Female", Age: 71, FamilyID: 3, DoctorID: 2, SensorID: 4, LocationID: 2, CareInstructions: "Massages before walking." }
    ]);
    const [caretakers, setCaretakers] = useState([
        { CaretakerID: 1, Fname: "James", Lname: "Bond", Username: "aaa", Password: "aaa" },
        { CaretakerID: 2, Fname: "Nemo", Lname: "Lisa", Username: "aaa", Password: "aaa" },
        { CaretakerID: 3, Fname: "Ali", Lname: "Hide", Username: "aaa", Password: "aaa" },
        { CaretakerID: 4, Fname: "Tenu", Lname: "Tony", Username: "aaa", Password: "aaa" }
    ]);
    const [doctors, setDoctors] = useState([
        { DoctorID: 1, Fname: "Opeo", Lname: "Bond", Username: "aaa", Password: "aaa" },
        { DoctorID: 2, Fname: "Nicia", Lname: "Lisa", Username: "aaa", Password: "aaa" },
        { DoctorID: 3, Fname: "Geraa", Lname: "Hide", Username: "aaa", Password: "aaa" },
        { DoctorID: 4, Fname: "Ludwaa", Lname: "Tony", Username: "aaa", Password: "aaa" }
    ]);
    const [families, setFamilies] = useState([
        { FamilyID: 1, Fname: "Silla", Lname: "Bond", Username: "aaa", Password: "aaa" },
        { FamilyID: 2, Fname: "Scale", Lname: "Lisa", Username: "aaa", Password: "aaa" },
        { FamilyID: 3, Fname: "Bagga", Lname: "Hide", Username: "aaa", Password: "aaa" },
        { FamilyID: 4, Fname: "Highaa", Lname: "Tony", Username: "aaa", Password: "aaa" }
    ]);

    // Edit Form for User / Resident
    const [accountTypeEdit, setAccountTypeEdit] = useState("");
    const [usernameEdit, setUsernameEdit] = useState("");
    const [passwordEdit, setPasswordEdit] = useState("");
    const [fnameEdit, setFirstNameEdit] = useState("");
    const [lnameEdit, setLastNameEdit] = useState("");
    const [itemIDEdit, setItemIDEdit] = useState("");

    // Add Form for User / Resident
    const [accountTypeAdd, setAccountTypeAdd] = useState("");
    const [usernameAdd, setUsernameAdd] = useState("");
    const [passwordAdd, setPasswordAdd] = useState("");
    const [fnameAdd, setFirstNameAdd] = useState("");
    const [lnameAdd, setLastNameAdd] = useState("");

    // Modal states
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)

    const handleSubmitEdit = (e) => {
        e.preventDefault();

        console.log(itemIDEdit + " " +
            accountTypeEdit + " " +
            usernameEdit + " " +
            passwordEdit + " " +
            fnameEdit + " " +
            lnameEdit
        )

        // create if statement depending on account type (Family, Doctor, Caretaker, Admin)
        // ADD THE ACCOUNT TO THE DATABASE
        let newData;
        if (accountTypeEdit === "family") {
            newData = { FamilyID: itemIDEdit, Fname: fnameEdit, Lname: lnameEdit, Username: usernameEdit, Password: passwordEdit };
        } else if (accountTypeEdit === "doctor") {
            newData = { DoctorID: itemIDEdit, Fname: fnameEdit, Lname: lnameEdit, Username: usernameEdit, Password: passwordEdit };
        } else if (accountTypeEdit === "caretaker") {
            newData = { CaretakerID: itemIDEdit, Fname: fnameEdit, Lname: lnameEdit, Username: usernameEdit, Password: passwordEdit };
        }

        editData(accountTypeEdit, itemIDEdit, newData);
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();

        console.log(accountTypeAdd + " " +
            usernameAdd + " " +
            passwordAdd + " " +
            fnameAdd + " " +
            lnameAdd
        )

        // create if statement depending on account type (Family, Doctor, Caretaker, Admin)
        // ADD THE ACCOUNT TO THE DATABASE
        let newData = { Fname: fnameAdd, Lname: lnameAdd, Username: usernameAdd, Password: passwordAdd };

        addData(accountTypeAdd, newData);
    };

    // Open the Edit Model
    function openEditForm(account, id, data) {
        console.log(account + " open edit modal");
        console.log(data);
        setItemIDEdit(id);
        setUsernameEdit(data.Username);
        setPasswordEdit(data.Password);
        setAccountTypeEdit(account);
        setFirstNameEdit(data.Fname)
        setLastNameEdit(data.Lname)
        setOpenEditModal(true);
    }

    function openAddForm(account) {
        setAccountTypeAdd(account);
        setUsernameAdd("");
        setPasswordAdd("");
        setFirstNameAdd("")
        setLastNameAdd("")
        setOpenAddModal(true);
    }

    if (!authenticated && accountType !== "admin") {
        return <Navigate replace to="/login" />; // redirect to the login page if not authenticated
    } else {
        return (
            <div>

                <ResidentList residents={residents} />

                <CaretakerList caretakers={caretakers} edit={openEditForm} add={openAddForm} />

                <DoctorList doctors={doctors} edit={openEditForm} add={openAddForm} />

                <FamilyList families={families} edit={openEditForm} add={openAddForm} />

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
                                        value={fnameEdit}
                                        onChange={(e) => setFirstNameEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="LastName"
                                        className="form-control"
                                        value={lnameEdit}
                                        onChange={(e) => setLastNameEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <p>Account Type: {accountTypeEdit} </p>
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
                                        value={fnameAdd}
                                        onChange={(e) => setFirstNameAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="LastName"
                                        className="form-control"
                                        value={lnameAdd}
                                        onChange={(e) => setLastNameAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <p>Account Type: {accountTypeAdd} </p>
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

// Access the API based on the button action and use POST Method
// Requires the API name, data
async function addData(api, data) {
    let address = "http://localhost:8080/CareSense/api/" + api;

    let newData = data;

    try {
        const res = await fetch(address, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
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

    // USE A FUNCTION TO REFRESH THE LIST

}

// Access the API based on the button action and use PUT Method
// Requires the API name, id, data
async function editData(api, id, data) {
    let address = "http://localhost:8080/CareSense/api/" + api + "/" + id;

    let currentData = data;

    try {
        const res = await fetch(address, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
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

    // USE A FUNCTION TO REFRESH THE LIST

}

// Access the API based on the button action and use DELETE Method
// Requires the API name, id
async function deleteData(api, id) {
    console.log(api + " delete " + id)
    let address = "http://localhost:8080/CareSense/api/" + api + "/" + id;

    try {
        const res = await fetch(address, {
            method: "delete"
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

    // USE A FUNCTION TO REFRESH THE LIST

}

// Table Component inside a Map For Each Resident
function ResidentList({ residents, edit, add }) {
    const listOfResidents = residents.map((resident) => {
        return (

            <tr key={resident.ResidentID}>
                <td>{resident.ResidentID}</td>
                <td>{resident.Fname}</td>
                <td>{resident.Lname}</td>
                <td>{resident.Sex}</td>
                <td>{resident.Age}</td>
                <td>{resident.FamilyID}</td>
                <td>{resident.DoctorID}</td>
                <td>{resident.SensorID}</td>
                <td>{resident.LocationID}</td>
                <td>{resident.CareInstructions}</td>
                <td>
                    <Button onClick={() => edit("resident", resident.ResidentID, resident)}>
                        Edit
                    </Button>
                    <Button onClick={() => deleteData("resident", resident.ResidentID)} className="ms-1">
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
                            <th>ResidentID</th>
                            <th>Fname</th>
                            <th>Lname</th>
                            <th>Sex</th>
                            <th>Age</th>
                            <th>FamilyID</th>
                            <th>DoctorID</th>
                            <th>SensorID</th>
                            <th>LocationID</th>
                            <th>CareInstructions</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfResidents}
                    </tbody>
                </Table>
                <Button onClick={() => add("resident")}>
                    Add Resident
                </Button>
            </Container>
        </div >
    )
}

// Table Component inside a Map For Each Caretaker
function CaretakerList({ caretakers, edit, add }) {
    const listOfCaretakers = caretakers.map((caretaker) => {
        return (

            <tr key={caretaker.CaretakerID}>
                <td>{caretaker.CaretakerID}</td>
                <td>{caretaker.Fname}</td>
                <td>{caretaker.Lname}</td>
                <td>{caretaker.Username}</td>
                <td>{caretaker.Password}</td>
                <td>
                    <Button onClick={() => edit("caretaker", caretaker.CaretakerID, caretaker)}>
                        Edit
                    </Button>
                    <Button onClick={() => deleteData("caretaker", caretaker.CaretakerID)} className="ms-1">
                        Delete
                    </Button>
                </td>
            </tr>
        )
    });
    return (
        <div>
            <Container className='p-4'>
                <p>Caretaker List</p>
                <Table striped>
                    <thead>
                        <tr>
                            <th>CaretakerID</th>
                            <th>Fname</th>
                            <th>Lname</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfCaretakers}
                    </tbody>
                </Table>
                <Button onClick={() => add("caretaker")}>
                    Add Caretaker User
                </Button>
            </Container>
        </div >
    )
}

// Table Component inside a Map For Each Doctor
function DoctorList({ doctors, edit, add }) {
    const listOfDoctors = doctors.map((doctor) => {
        return (

            <tr key={doctor.DoctorID}>
                <td>{doctor.DoctorID}</td>
                <td>{doctor.Fname}</td>
                <td>{doctor.Lname}</td>
                <td>{doctor.Username}</td>
                <td>{doctor.Password}</td>
                <td>
                    <Button onClick={() => edit("doctor", doctor.DoctorID, doctor)}>
                        Edit
                    </Button>
                    <Button onClick={() => deleteData("doctor", doctor.DoctorID)} className="ms-1">
                        Delete
                    </Button>
                </td>
            </tr>
        )
    });
    return (
        <div>
            <Container className='p-4'>
                <p>Doctor List</p>
                <Table striped>
                    <thead>
                        <tr>
                            <th>DoctorID</th>
                            <th>Fname</th>
                            <th>Lname</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfDoctors}
                    </tbody>
                </Table>
                <Button onClick={() => add("doctor")}>
                    Add Doctor User
                </Button>
            </Container>
        </div >
    )
}

// Table Component inside a Map For Each Doctor
function FamilyList({ families, edit, add }) {
    const listOfFamilies = families.map((family) => {
        return (

            <tr key={family.FamilyID}>
                <td>{family.FamilyID}</td>
                <td>{family.Fname}</td>
                <td>{family.Lname}</td>
                <td>{family.Username}</td>
                <td>{family.Password}</td>
                <td>
                    <Button onClick={() => edit("family", family.FamilyID, family)}>
                        Edit
                    </Button>
                    <Button onClick={() => deleteData("family", family.FamilyID)} className="ms-1">
                        Delete
                    </Button>
                </td>
            </tr>
        )
    });
    return (
        <div>
            <Container className='p-4'>
                <p>Family List</p>
                <Table striped>
                    <thead>
                        <tr>
                            <th>FamilyID</th>
                            <th>Fname</th>
                            <th>Lname</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfFamilies}
                    </tbody>
                </Table>
                <Button onClick={() => add("family")}>
                    Add Family User
                </Button>
            </Container>
        </div >
    )
}

export default Admin;