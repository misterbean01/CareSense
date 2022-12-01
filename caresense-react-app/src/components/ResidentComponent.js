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
    const [accountType, setAccountType] = useState(sessionStorage.getItem("accountType"));
    const stateLoc = useLocation();
    const resident = stateLoc.state.resident;
    const user = stateLoc.state.user;
    const [medications,] = useState([
        { MedicationID: 1, ResidentID: 1, MedicationName: "Drug A", Dosage: 100, Instruction: "Once per day." },
        { MedicationID: 4, ResidentID: 2, MedicationName: "Drub B", Dosage: 150, Instruction: "Once per day." },
        { MedicationID: 2, ResidentID: 3, MedicationName: "Drug C", Dosage: 20, Instruction: "Once per day." },
        { MedicationID: 3, ResidentID: 1, MedicationName: "Drug D", Dosage: 160, Instruction: "Twice per day." }
    ]);
    const [nutritions,] = useState([
        { NutritionID: 1, ResidentID: 1, Instruction: "Green Leafy." },
        { NutritionID: 4, ResidentID: 2, Instruction: "Liver cooking." },
        { NutritionID: 2, ResidentID: 3, Instruction: "Low carbohydrate diet." },
        { NutritionID: 3, ResidentID: 1, Instruction: "A Gallon of water a day." }
    ]);

    // Add / Edit Form for Medication
    const [medicResidentIDAdd, setMedicResidentIDAdd] = useState("");
    const [medicNameAdd, setMedicNameAdd] = useState("");
    const [medicDosageAdd, setMedicDosageAdd] = useState("");
    const [medicInstructionAdd, setMedicInstructionAdd] = useState("");
    const [medicResidentIDEdit, setMedicResidentIDEdit] = useState("");
    const [medicNameEdit, setMedicNameEdit] = useState("");
    const [medicDosageEdit, setMedicDosageEdit] = useState("");
    const [medicInstructionEdit, setMedicInstructionEdit] = useState("");

    // Add / Edit Form for Nutrition
    const [itemIDEdit, setItemIDEdit] = useState("");
    const [nutriResidentIDAdd, setNutriResidentIDAdd] = useState("");
    const [nutriInstructionAdd, setNutriInstructionAdd] = useState("");
    const [nutriResidentIDEdit, setNutriResidentIDEdit] = useState("");
    const [nutriInstructionEdit, setNutriInstructionEdit] = useState("");

    // Modal states
    const [openAddMedicModal, setOpenAddMedicModal] = useState(false)
    const [openEditMedicModal, setOpenEditMedicModal] = useState(false)
    const [openAddNutriModal, setOpenAddNutriModal] = useState(false)
    const [openEditNutriModal, setOpenEditNutriModal] = useState(false)

    useEffect(() => {

    }, []);

    const handleSubmitMedicEdit = (e) => {
        e.preventDefault();

        console.log(itemIDEdit + " " +
            medicResidentIDEdit + " " +
            medicNameEdit + " " +
            medicDosageEdit + " " +
            medicInstructionEdit + " "
        );

        let newData;
        newData = {
            MedicationID: itemIDEdit, ResidentID: medicResidentIDEdit, Name: medicNameEdit,
            Dosage: medicDosageEdit, Instruction: medicInstructionEdit
        };

        editData("medication", itemIDEdit, newData);
        setOpenEditMedicModal(false);
    };

    const handleSubmitMedicAdd = (e) => {
        e.preventDefault();

        console.log(medicResidentIDAdd + " " +
            medicNameAdd + " " +
            medicDosageAdd + " " +
            medicInstructionAdd + " "
        );

        let newData;
        newData = {
            ResidentID: medicResidentIDAdd, Name: medicNameAdd,
            Dosage: medicDosageAdd, Instruction: medicInstructionAdd
        };

        addData("medication", newData);
        setOpenAddMedicModal(false);
    };

    const handleSubmitNutriEdit = (e) => {
        e.preventDefault();

        console.log(itemIDEdit + " " +
            nutriResidentIDEdit + " " +
            nutriInstructionEdit + " "
        );

        let newData;
        newData = {
            NutritionID: itemIDEdit, ResidentID: nutriResidentIDEdit,
            Instruction: nutriInstructionEdit
        };

        editData("nutrition", itemIDEdit, newData);
        setOpenEditNutriModal(false);
    };

    const handleSubmitNutriAdd = (e) => {
        e.preventDefault();

        console.log(nutriResidentIDAdd + " " +
            nutriInstructionAdd + " "
        );

        let newData;
        newData = {
            ResidentID: nutriResidentIDAdd, Instruction: nutriInstructionAdd
        };

        addData("nutrition", newData);
        setOpenAddNutriModal(false);
    };
    // Open the Edit Medication Modal
    function openEditMedicForm(id, data) {
        console.log("Medication open edit modal");
        console.log(data);
        setItemIDEdit(id);
        setMedicResidentIDEdit(data.ResidentID);
        setMedicNameEdit(data.MedicationName);
        setMedicDosageEdit(data.Dosage);
        setMedicInstructionEdit(data.Instruction);
        setOpenEditMedicModal(true);
    }

    // Open the Add Associated Modal
    function openAddMedicForm(data) {
        console.log("Medication open add modal");
        console.log(data);
        setMedicResidentIDAdd("");
        setMedicNameAdd("");
        setMedicDosageAdd("");
        setMedicInstructionAdd("");
        setOpenAddMedicModal(true);
    }

    // Open the Edit Nutrition Modal
    function openEditNutriForm(id, data) {
        console.log("Nutrition open edit modal");
        console.log(data);
        setItemIDEdit(id);
        setNutriResidentIDEdit(data.ResidentID);
        setNutriInstructionEdit(data.Instruction);
        setOpenEditNutriModal(true);
    }

    // Open the Add Nutrition Modal
    function openAddNutriForm(data) {
        console.log("Nutrition open add modal");
        console.log(data);
        setNutriResidentIDAdd("");
        setNutriInstructionAdd("");
        setOpenAddNutriModal(true);
    }


    function MedicationList({ medications, edit, add }) {
        // RETRIVE THIS FROM DATABASE THAT IS FILTERED

        const listOfMedication = medications.map((medication) => {

            return (

                <tr key={medication.MedicationID}>
                    <td>{medication.MedicationID}</td>
                    <td>{medication.ResidentID}</td>
                    <td>{medication.MedicationName}</td>
                    <td>{medication.Dosage}</td>
                    <td>{medication.Instruction}</td>
                    {accountType === "Doctor" && (
                        <td>
                            <Button onClick={() => edit(medication.MedicationID, medication)}>
                                Edit
                            </Button>
                            <Button onClick={() => deleteData("medication", medication.MedicationID)} className="ms-1">
                                Delete
                            </Button>
                        </td>
                    )}
                </tr>
            )
        });
        return (
            <div>
                <Container className='p-4'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>MedicationID</th>
                                <th>ResidentID</th>
                                <th>Name</th>
                                <th>Dosage</th>
                                <th>Instruction</th>
                                {accountType === "Doctor" && (<th>OPTIONS</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {listOfMedication}
                        </tbody>
                    </Table>
                    {accountType === "Doctor" && (
                        <Button onClick={() => add()}>
                            Add Medication
                        </Button>
                    )}
                </Container>
            </div >
        )
    }

    function NutritionList({ nutritions, edit, add }) {
        const listOfNutrition = nutritions.map((nutrition) => {
            return (

                <tr key={nutrition.NutritionID}>
                    <td>{nutrition.NutritionID}</td>
                    <td>{nutrition.ResidentID}</td>
                    <td>{nutrition.Instruction}</td>
                    {accountType === "Doctor" && (
                        <td>
                            <Button onClick={() => edit(nutrition.NutritionID, nutrition)}>
                                Edit
                            </Button>
                            <Button onClick={() => deleteData("nutrition", nutrition.NutritionID)} className="ms-1">
                                Delete
                            </Button>
                        </td>
                    )}
                </tr>
            )
        });
        return (
            <div>
                <Container className='p-4'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>NutritionID</th>
                                <th>ResidentID</th>
                                <th>Instruction</th>
                                {accountType === "Doctor" && (<th>OPTIONS</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {listOfNutrition}
                        </tbody>
                    </Table>
                    {accountType === "Doctor" && (
                        <Button onClick={() => add()}>
                            Add Nutrition
                        </Button>
                    )}
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
                    <p>Welcome to Care Sense, {user.Username}, ID: {user.ID} <Button onClick={() => {
                        sessionStorage.setItem("authenticated", false);
                        sessionStorage.setItem("accountType", "");
                        console.log("Logout Successful");
                        navigate("/login");
                    }}>
                        Logout
                    </Button>
                    </p>

                    <p>{resident.Fname}'s Resident Page</p>

                    <Table className="mt-5" striped bordered hover size="sm">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{resident.Fname}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{resident.Lname}</td>
                            </tr>
                            <tr>
                                <td>Sex</td>
                                <td>{resident.Sex}</td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>{resident.Age}</td>
                            </tr>
                            <tr>
                                <td>Family</td>
                                <td>{resident.FamilyID}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <p>Doctor:  {resident.DoctorID}</p>

                    <p>Current Medication:</p>
                    <MedicationList medications={medications} edit={openEditMedicForm} add={openAddMedicForm} />


                    <p>Nutrition:</p>
                    <NutritionList nutritions={nutritions} edit={openEditNutriForm} add={openAddNutriForm} />

                    <p>Care Instruction</p>
                    <ul>{resident.CareInstructions}</ul>

                    <p>Location:  {resident.LocationID}</p>

                    <p>Sensor:  {resident.SensorID}</p>

                    <Modal show={openEditMedicModal} onHide={() => setOpenEditMedicModal(false)} animation={false}
                        style={{ overlay: { backgroundColor: 'grey' } }}>
                        <h4 className="d-flex justify-content-center">User Edit</h4>
                        <div className="d-flex justify-content-center">
                            <div className="mt-5 justify-content-center">
                                <form onSubmit={handleSubmitMedicEdit}>
                                    <div className="mb-3">
                                        <label className="mb-1">ResidentID</label>
                                        <input
                                            type="text"
                                            name="ResidentID"
                                            className="form-control"
                                            value={medicResidentIDEdit}
                                            onChange={(e) => setMedicResidentIDEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Medication Name</label>
                                        <input
                                            type="text"
                                            name="Name"
                                            className="form-control"
                                            value={medicNameEdit}
                                            onChange={(e) => setMedicNameEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Dosage</label>
                                        <input
                                            type="text"
                                            name="Dosage"
                                            className="form-control"
                                            value={medicDosageEdit}
                                            onChange={(e) => setMedicDosageEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Instruction</label>
                                        <input
                                            type="text"
                                            name="Instruction"
                                            className="form-control"
                                            value={medicInstructionEdit}
                                            onChange={(e) => setMedicInstructionEdit(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </Modal>

                    <Modal show={openAddMedicModal} onHide={() => setOpenAddMedicModal(false)} animation={false}
                        style={{ overlay: { backgroundColor: 'grey' } }}>
                        <h4 className="d-flex justify-content-center">User Add</h4>
                        <div className="d-flex justify-content-center">
                            <div className="mt-5 justify-content-center">
                                <form onSubmit={handleSubmitMedicAdd}>
                                    <div className="mb-3">
                                        <label className="mb-1">ResidentID</label>
                                        <input
                                            type="text"
                                            name="ResidentID"
                                            className="form-control"
                                            value={medicResidentIDAdd}
                                            onChange={(e) => setMedicResidentIDAdd(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Medication Name</label>
                                        <input
                                            type="text"
                                            name="Name"
                                            className="form-control"
                                            value={medicNameAdd}
                                            onChange={(e) => setMedicNameAdd(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Dosage</label>
                                        <input
                                            type="text"
                                            name="Dosage"
                                            className="form-control"
                                            value={medicDosageAdd}
                                            onChange={(e) => setMedicDosageAdd(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Instruction</label>
                                        <input
                                            type="text"
                                            name="Instruction"
                                            className="form-control"
                                            value={medicInstructionAdd}
                                            onChange={(e) => setMedicInstructionAdd(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </Modal>

                    <Modal show={openEditNutriModal} onHide={() => setOpenEditNutriModal(false)} animation={false}
                        style={{ overlay: { backgroundColor: 'grey' } }}>
                        <h4 className="d-flex justify-content-center">User Edit</h4>
                        <div className="d-flex justify-content-center">
                            <div className="mt-5 justify-content-center">
                                <form onSubmit={handleSubmitNutriEdit}>
                                    <div className="mb-3">
                                        <label className="mb-1">ResidentID</label>
                                        <input
                                            type="text"
                                            name="ResidentID"
                                            className="form-control"
                                            value={nutriResidentIDEdit}
                                            onChange={(e) => setNutriResidentIDEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Instruction</label>
                                        <input
                                            type="text"
                                            name="Instruction"
                                            className="form-control"
                                            value={nutriInstructionEdit}
                                            onChange={(e) => setNutriInstructionEdit(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </Modal>

                    <Modal show={openAddNutriModal} onHide={() => setOpenAddNutriModal(false)} animation={false}
                        style={{ overlay: { backgroundColor: 'grey' } }}>
                        <h4 className="d-flex justify-content-center">User Add</h4>
                        <div className="d-flex justify-content-center">
                            <div className="mt-5 justify-content-center">
                                <form onSubmit={handleSubmitNutriAdd}>
                                    <div className="mb-3">
                                        <label className="mb-1">ResidentID</label>
                                        <input
                                            type="text"
                                            name="ResidentID"
                                            className="form-control"
                                            value={nutriResidentIDAdd}
                                            onChange={(e) => setNutriResidentIDAdd(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1">Instruction</label>
                                        <input
                                            type="text"
                                            name="Instruction"
                                            className="form-control"
                                            value={nutriInstructionAdd}
                                            onChange={(e) => setNutriInstructionAdd(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </Modal>

                </div>

                <div>
                    <Button onClick={() => {
                        navigate("/", { state: { user: user } });
                    }}>
                        Back to Home
                    </Button>
                </div>

            </div>
        );
    }
};


// Access the API based on the button action and use POST Method
// Requires the API name, data
async function addData(api, data) {
    let address = "CareSense/api/" + api;

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

    // USE A FUNCTION TO REFRESH THE LIST

}

// Access the API based on the button action and use PUT Method
// Requires the API name, id, data
async function editData(api, id, data) {
    let address = "CareSense/api/" + api + "/" + id;

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

    // USE A FUNCTION TO REFRESH THE LIST

}

// Access the API based on the button action and use DELETE Method
// Requires the API name, id
async function deleteData(api, id) {
    console.log(api + " delete " + id)
    let address = "CareSense/api/" + api + "/" + id;

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

    // USE A FUNCTION TO REFRESH THE LIST

}

export default Resident;