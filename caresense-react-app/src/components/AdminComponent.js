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
    const [accountType, setAccountType] = useState(sessionStorage.getItem("accountType"));
    const [residents, setResidents] = useState([
        { ResidentID: 1, Fname: "Harold", Lname: "Hide", Sex: "Male", Age: 70, SensorID: 1, LocationID: 1, CareInstructions: "Morning Exercises for 10 minutes." },
        { ResidentID: 2, Fname: "Lisa", Lname: "Lisa", Sex: "Female", Age: 70, SensorID: 2, LocationID: 2, CareInstructions: "Sleep 8 hours a day." },
        { ResidentID: 3, Fname: "Rodger", Lname: "Hide", Sex: "Male", Age: 72, SensorID: 3, LocationID: 1, CareInstructions: "Drink Water every 4 hours." },
        { ResidentID: 4, Fname: "Ann", Lname: "Tony", Sex: "Female", Age: 71, SensorID: 4, LocationID: 2, CareInstructions: "Massages before walking." }
    ]);
    const [userAccounts, setUserAccounts] = useState([
        { UserID: 1, Fname: "James", Lname: "Bond", Username: "aaa", Password: "aaa", AccountType: "Family" },
        { UserID: 2, Fname: "Nemo", Lname: "Lisa", Username: "aaa", Password: "aaa", AccountType: "Family" },
        { UserID: 3, Fname: "Ali", Lname: "Hide", Username: "aaa", Password: "aaa", AccountType: "Caretaker" },
        { UserID: 4, Fname: "Tenu", Lname: "Tony", Username: "aaa", Password: "aaa", AccountType: "Doctor" },
        { UserID: 5, Fname: "Reqa", Lname: "Rest", Username: "aaa", Password: "aaa", AccountType: "Family" }
    ]);
    const [associateds, setAssociateds] = useState([
        { AssociatedID: 1, ResidentID: 1, UserID: 1 },
        { AssociatedID: 2, ResidentID: 1, UserID: 3 },
        { AssociatedID: 3, ResidentID: 1, UserID: 4 },
        { AssociatedID: 4, ResidentID: 2, UserID: 2 },
        { AssociatedID: 5, ResidentID: 3, UserID: 2 }
    ]);
    const [medications, setMedications] = useState([
        { MedicationID: 1, ResidentID: 1, MedicationName: "Drug A", Dosage: 100, Instruction: "Once per day." },
        { MedicationID: 4, ResidentID: 2, MedicationName: "Drub B", Dosage: 150, Instruction: "Once per day." },
        { MedicationID: 2, ResidentID: 3, MedicationName: "Drug C", Dosage: 20, Instruction: "Once per day." },
        { MedicationID: 3, ResidentID: 1, MedicationName: "Drug D", Dosage: 160, Instruction: "Twice per day." }
    ]);
    const [nutritions, setNutritions] = useState([
        { NutritionID: 1, ResidentID: 1, Instruction: "Green Leafy." },
        { NutritionID: 4, ResidentID: 2, Instruction: "Liver cooking." },
        { NutritionID: 2, ResidentID: 3, Instruction: "Low carbohydrate diet." },
        { NutritionID: 3, ResidentID: 1, Instruction: "A Gallon of water a day." }
    ]);

    // Edit Form for User / Resident
    const [accountTypeEdit, setAccountTypeEdit] = useState("");
    const [usernameEdit, setUsernameEdit] = useState("");
    const [passwordEdit, setPasswordEdit] = useState("");
    const [fnameEdit, setFirstNameEdit] = useState("");
    const [lnameEdit, setLastNameEdit] = useState("");
    const [itemIDEdit, setItemIDEdit] = useState("");
    const [sexEdit, setSexEdit] = useState("");
    const [ageEdit, setAgeEdit] = useState("");
    const [sensorIDEdit, setSensorIDEdit] = useState("");
    const [locationIDEdit, setLocationIDEdit] = useState("");
    const [careInstructionsEdit, setCareInstructionsEdit] = useState("");

    // Add Form for User / Resident
    const [accountTypeAdd, setAccountTypeAdd] = useState("");
    const [usernameAdd, setUsernameAdd] = useState("");
    const [passwordAdd, setPasswordAdd] = useState("");
    const [fnameAdd, setFirstNameAdd] = useState("");
    const [lnameAdd, setLastNameAdd] = useState("");
    const [sexAdd, setSexAdd] = useState("");
    const [ageAdd, setAgeAdd] = useState("");
    const [sensorIDAdd, setSensorIDAdd] = useState("");
    const [locationIDAdd, setLocationIDAdd] = useState("");
    const [careInstructionsAdd, setCareInstructionsAdd] = useState("");

    // Add / Edit Form for Associated
    const [associatedResidentIDAdd, setAssociatedResidentIDAdd] = useState("");
    const [associatedUserIDAdd, setAssociatedUserIDAdd] = useState("");
    const [associatedResidentIDEdit, setAssociatedResidentIDEdit] = useState("");
    const [associatedUserIDEdit, setAssociatedUserIDEdit] = useState("");

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
    const [nutriResidentIDAdd, setNutriResidentIDAdd] = useState("");
    const [nutriNameAdd, setNutriNameAdd] = useState("");
    const [nutriDosageAdd, setNutriDosageAdd] = useState("");
    const [nutriInstructionAdd, setNutriInstructionAdd] = useState("");
    const [nutriResidentIDEdit, setNutriResidentIDEdit] = useState("");
    const [nutriNameEdit, setNutriNameEdit] = useState("");
    const [nutriDosageEdit, setNutriDosageEdit] = useState("");
    const [nutriInstructionEdit, setNutriInstructionEdit] = useState("");

    // Modal states
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openAddResModal, setOpenAddResModal] = useState(false)
    const [openEditResModal, setOpenEditResModal] = useState(false)
    const [openAddAssociatedModal, setOpenAddAssociatedModal] = useState(false)
    const [openEditAssociatedModal, setOpenEditAssociatedModal] = useState(false)
    const [openAddMedicModal, setOpenAddMedicModal] = useState(false)
    const [openEditMedicModal, setOpenEditMedicModal] = useState(false)
    const [openAddNutriModal, setOpenAddNutriModal] = useState(false)
    const [openEditNutriModal, setOpenEditNutriModal] = useState(false)

    const navigate = useNavigate();
    const stateLoc = useLocation();
    const user = stateLoc.state.user;

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
        newData = {
            UserID: itemIDEdit, Fname: fnameEdit, Lname: lnameEdit,
            Username: usernameEdit, Password: passwordEdit, AccountType: accountTypeEdit
        };

        editData(accountTypeEdit.toLowerCase(), itemIDEdit, newData);
        setOpenEditModal(false);
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
        let newData = {
            Fname: fnameAdd, Lname: lnameAdd,
            Username: usernameAdd, Password: passwordAdd, AccountType: accountTypeAdd
        };


        addData(accountTypeAdd.toLowerCase(), newData);
        setOpenAddModal(false);
    };

    const handleSubmitResEdit = (e) => {
        e.preventDefault();

        console.log(itemIDEdit + " " +
            fnameEdit + " " +
            lnameEdit + " " +
            sexEdit + " " +
            ageEdit + " " +
            sensorIDEdit + " " +
            locationIDEdit + " " +
            careInstructionsEdit
        )

        // create if statement depending on Residents
        // ADD THE ACCOUNT TO THE DATABASE
        let newData = {
            Fname: fnameEdit, Lname: lnameEdit, Sex: sexEdit, Age: ageEdit,
            SensorID: sensorIDEdit, LocationID: locationIDEdit,
            CareInstructions: careInstructionsEdit
        };

        editData("", itemIDEdit, newData);
        setOpenEditResModal(false);
    };

    const handleSubmitResAdd = (e) => {
        e.preventDefault();

        console.log(
            fnameAdd + " " +
            lnameAdd + " " +
            sexAdd + " " +
            ageAdd + " " +
            sensorIDAdd + " " +
            locationIDAdd + " " +
            careInstructionsAdd
        )


        // create if statement depending on Residents
        // ADD THE ACCOUNT TO THE DATABASE
        let newData = {
            Fname: fnameAdd, Lname: lnameAdd, Sex: sexAdd, Age: ageAdd,
            SensorID: sensorIDAdd, LocationID: locationIDAdd,
            CareInstructions: careInstructionsAdd
        };

        addData("resident", newData);
        setOpenAddResModal(false);
    };

    const handleSubmitAssociatedEdit = (e) => {
        e.preventDefault();

        console.log(associatedResidentIDEdit + " " +
            associatedUserIDEdit + " "
        );

        let newData;
        newData = {
            AssociatedID: itemIDEdit, ResidentID: associatedResidentIDEdit, UserID: associatedUserIDEdit,
        };

        editData("associated", itemIDEdit, newData);
        setOpenEditAssociatedModal(false);
    };

    const handleSubmitAssociatedAdd = (e) => {
        e.preventDefault();

        console.log(associatedResidentIDAdd + " " +
            associatedUserIDAdd + " "
        );

        let newData = {
            ResidentID: associatedResidentIDAdd, UserID: associatedUserIDAdd,
        };


        addData("associated", newData);
        setOpenAddAssociatedModal(false);
    };

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


    // Open the Edit Model
    function openEditForm(data) {
        console.log(data.AccountType + " open edit modal");
        console.log(data);
        setItemIDEdit(data.UserID);
        setUsernameEdit(data.Username);
        setPasswordEdit(data.Password);
        setAccountTypeEdit(data.AccountType);
        setFirstNameEdit(data.Fname)
        setLastNameEdit(data.Lname)
        setOpenEditModal(true);
    }

    // Open the Add Model
    function openAddForm() {
        setAccountTypeAdd("");
        setUsernameAdd("");
        setPasswordAdd("");
        setFirstNameAdd("")
        setLastNameAdd("")
        setOpenAddModal(true);
    }

    // Open the Edit Model
    function openEditResForm(id, data) {
        console.log("resident open edit modal");
        console.log(data);
        setAccountTypeEdit("");
        setItemIDEdit(id);
        setUsernameEdit(data.Username);
        setPasswordEdit(data.Password);
        setFirstNameEdit(data.Fname);
        setLastNameEdit(data.Lname);
        setSexEdit(data.Sex);
        setAgeEdit(data.Age);
        setSensorIDEdit(data.SensorID);
        setLocationIDEdit(data.LocationID);
        setCareInstructionsEdit(data.CareInstructions);
        setOpenEditResModal(true);
    }

    // Open the Add Model
    function openAddResForm() {
        setAccountTypeAdd("");
        setUsernameAdd("");
        setPasswordAdd("");
        setFirstNameAdd("");
        setLastNameAdd("");
        setSexAdd("");
        setAgeAdd("");
        setSensorIDAdd("");
        setLocationIDAdd("");
        setCareInstructionsAdd("");
        setOpenAddResModal(true);
    }

    // Open the Edit Associated Modal
    function openEditAssociatedForm(id, data) {
        console.log("assoicated open edit modal");
        console.log(data);
        setItemIDEdit(id);
        setAssociatedResidentIDEdit(data.ResidentID);
        setAssociatedUserIDEdit(data.UserID);
        setOpenEditAssociatedModal(true);
    }

    // Open the Add Associated Modal
    function openAddAssociatedForm(data) {
        console.log("assoicated open add modal");
        console.log(data);
        setAssociatedResidentIDAdd("");
        setAssociatedUserIDAdd("");
        setOpenAddAssociatedModal(true);
    }

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
        setNutriNameEdit(data.Name);
        setNutriDosageEdit(data.Dosage);
        setNutriInstructionEdit(data.Instruction);
        setOpenEditNutriModal(true);
    }

    // Open the Add Nutrition Modal
    function openAddNutriForm(data) {
        console.log("Nutrition open add modal");
        console.log(data);
        setNutriResidentIDAdd("");
        setNutriNameAdd("");
        setNutriDosageAdd("");
        setNutriInstructionAdd("");
        setOpenAddNutriModal(true);
    }

    if (!authenticated && accountType !== "admin") {
        return <Navigate replace to="/login" />; // redirect to the login page if not authenticated
    } else {
        return (
            <div>
                <p>Welcome to Care Sense Admin, {user.Username}, ID: {user.ID} <Button onClick={() => {
                    sessionStorage.setItem("authenticated", false);
                    sessionStorage.setItem("accountType", "");
                    console.log("Logout Successful");
                    navigate("/login");
                }}>
                    Logout
                </Button>
                </p>

                <ResidentList residents={residents} edit={openEditResForm} add={openAddResForm} />

                <UserList users={userAccounts} edit={openEditForm} add={openAddForm} />

                <AssociatedList associateds={associateds} edit={openEditAssociatedForm} add={openAddAssociatedForm} />

                <MedicationList medications={medications} edit={openEditMedicForm} add={openAddMedicForm} />

                <NutritionList nutritions={nutritions} edit={openEditNutriForm} add={openAddNutriForm} />

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
                                    <label className="label">Select Account Type</label>
                                    <select onChange={(e) => setAccountTypeAdd(e.target.value)} defaultValue="" className="form-control">
                                        <option>Select Account Type</option>
                                        <option value="Caretaker">Caretaker</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Family">Family</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openEditResModal} onHide={() => setOpenEditResModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">User Edit</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitResEdit}>
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
                                    <label className="mb-1">Sex</label>
                                    <input
                                        type="text"
                                        name="Sex"
                                        className="form-control"
                                        value={sexEdit}
                                        onChange={(e) => setSexEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Age</label>
                                    <input
                                        type="text"
                                        name="Age"
                                        className="form-control"
                                        value={ageEdit}
                                        onChange={(e) => setAgeEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">SensorID</label>
                                    <input
                                        type="text"
                                        name="SensorID"
                                        className="form-control"
                                        value={sensorIDEdit}
                                        onChange={(e) => setSensorIDEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">LocationID</label>
                                    <input
                                        type="text"
                                        name="LocationID"
                                        className="form-control"
                                        value={locationIDEdit}
                                        onChange={(e) => setLocationIDEdit(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">CareInstructions</label>
                                    <textarea
                                        type="textarea"
                                        name="CareInstructions"
                                        className="form-control"
                                        value={careInstructionsEdit}
                                        onChange={(e) => setCareInstructionsEdit(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openAddResModal} onHide={() => setOpenAddResModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">User Add</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitResAdd}>
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
                                    <label className="mb-1">Sex</label>
                                    <input
                                        type="text"
                                        name="Sex"
                                        className="form-control"
                                        value={sexAdd}
                                        onChange={(e) => setSexAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">Age</label>
                                    <input
                                        type="text"
                                        name="Age"
                                        className="form-control"
                                        value={ageAdd}
                                        onChange={(e) => setAgeAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">SensorID</label>
                                    <input
                                        type="text"
                                        name="SensorID"
                                        className="form-control"
                                        value={sensorIDAdd}
                                        onChange={(e) => setSensorIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">LocationID</label>
                                    <input
                                        type="text"
                                        name="LocationID"
                                        className="form-control"
                                        value={locationIDAdd}
                                        onChange={(e) => setLocationIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">CareInstructions</label>
                                    <textarea
                                        type="textarea"
                                        name="CareInstructions"
                                        className="form-control"
                                        value={careInstructionsAdd}
                                        onChange={(e) => setCareInstructionsAdd(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal show={openEditAssociatedModal} onHide={() => setOpenEditAssociatedModal(false)} animation={false}
                    style={{ overlay: { backgroundColor: 'grey' } }}>
                    <h4 className="d-flex justify-content-center">User Edit</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitAssociatedEdit}>
                                <div className="mb-3">
                                    <label className="mb-1">ResidentID</label>
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
                    <h4 className="d-flex justify-content-center">User Edit</h4>
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 justify-content-center">
                            <form onSubmit={handleSubmitAssociatedAdd}>
                                <div className="mb-3">
                                    <label className="mb-1">ResidentID</label>
                                    <input
                                        type="text"
                                        name="ResidentID"
                                        className="form-control"
                                        value={associatedResidentIDAdd}
                                        onChange={(e) => setAssociatedResidentIDAdd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1">UserID</label>
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
        );
    }
}

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
                    <Button onClick={() => edit(resident.ResidentID, resident)}>
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

            <tr key={user.UserID}>
                <td>{user.UserID}</td>
                <td>{user.Fname}</td>
                <td>{user.Lname}</td>
                <td>{user.Username}</td>
                <td>{user.Password}</td>
                <td>{user.AccountType}</td>
                <td>
                    <Button onClick={() => edit(user)}>
                        Edit
                    </Button>
                    <Button onClick={() => deleteData(user.AccountType.toLowerCase(), user.UserID)} className="ms-1">
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
                            <th>UserID</th>
                            <th>Fname</th>
                            <th>Lname</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>AccountType</th>
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
function AssociatedList({ associateds, edit, add }) {
    const listOfAssociateds = associateds.map((associated) => {
        return (

            <tr key={associated.AssociatedID}>
                <td>{associated.AssociatedID}</td>
                <td>{associated.ResidentID}</td>
                <td>{associated.UserID}</td>
                <td>
                    <Button onClick={() => edit(associated.AssociatedID, associated)}>
                        Edit
                    </Button>
                    <Button onClick={() => deleteData("associated", associated.AssociatedID)} className="ms-1">
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
                            <th>AssociatedID</th>
                            <th>ResidentID</th>
                            <th>UserID</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfAssociateds}
                    </tbody>
                </Table>
                <Button onClick={() => add()}>
                    Add User
                </Button>
            </Container>
        </div >
    )
}

// Table Component inside a Map For Each Medication
function MedicationList({ medications, edit, add }) {
    const listOfMedication = medications.map((medication) => {
        return (

            <tr key={medication.MedicationID}>
                <td>{medication.MedicationID}</td>
                <td>{medication.ResidentID}</td>
                <td>{medication.MedicationName}</td>
                <td>{medication.Dosage}</td>
                <td>{medication.Instruction}</td>
                <td>
                    <Button onClick={() => edit(medication.MedicationID, medication)}>
                        Edit
                    </Button>
                    <Button onClick={() => deleteData("medication", medication.MedicationID)} className="ms-1">
                        Delete
                    </Button>
                </td>
            </tr>
        )
    });
    return (
        <div>
            <Container className='p-4'>
                <p>Medication List</p>
                <Table striped>
                    <thead>
                        <tr>
                            <th>MedicationID</th>
                            <th>ResidentID</th>
                            <th>Name</th>
                            <th>Dosage</th>
                            <th>Instruction</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfMedication}
                    </tbody>
                </Table>
                <Button onClick={() => add()}>
                    Add Medication
                </Button>
            </Container>
        </div >
    )
}


// Table Component inside a Map For Each Medication
function NutritionList({ nutritions, edit, add }) {
    const listOfNutrition = nutritions.map((nutrition) => {
        return (

            <tr key={nutrition.NutritionID}>
                <td>{nutrition.NutritionID}</td>
                <td>{nutrition.ResidentID}</td>
                <td>{nutrition.Instruction}</td>
                <td>
                    <Button onClick={() => edit(nutrition.NutritionID, nutrition)}>
                        Edit
                    </Button>
                    <Button onClick={() => deleteData("nutrition", nutrition.NutritionID)} className="ms-1">
                        Delete
                    </Button>
                </td>
            </tr>
        )
    });
    return (
        <div>
            <Container className='p-4'>
                <p>Medication List</p>
                <Table striped>
                    <thead>
                        <tr>
                            <th>NutritionID</th>
                            <th>ResidentID</th>
                            <th>Instruction</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfNutrition}
                    </tbody>
                </Table>
                <Button onClick={() => add()}>
                    Add Nutrition
                </Button>
            </Container>
        </div >
    )
}


export default Admin;