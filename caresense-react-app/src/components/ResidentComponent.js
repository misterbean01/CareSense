import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router-dom";

const Resident = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("authenticated"));
    const stateLoc = useLocation();
    const resident = stateLoc.state.resident;
    const user = stateLoc.state.user;
    const [medication,] = useState([
        { MedicationID: 1, ResidentID: 1, MedicationName: "Drug A", Dosage: 100, Instruction: "Once per day." },
        { MedicationID: 4, ResidentID: 2, MedicationName: "Drub B", Dosage: 150, Instruction: "Once per day." },
        { MedicationID: 2, ResidentID: 3, MedicationName: "Drug C", Dosage: 20, Instruction: "Once per day." },
        { MedicationID: 3, ResidentID: 1, MedicationName: "Drug D", Dosage: 160, Instruction: "Twice per day." }
    ]);
    const [nutrition,] = useState([
        { NutritionID: 1, ResidentID: 1, Instruction: "Green Leafy." },
        { NutritionID: 4, ResidentID: 2, Instruction: "Liver cooking." },
        { NutritionID: 2, ResidentID: 3, Instruction: "Low carbohydrate diet." },
        { NutritionID: 3, ResidentID: 1, Instruction: "A Gallon of water a day." }
    ]);

    useEffect(() => {

    }, []);

    function MedicationList({ resident }) {
        // RETRIVE THIS FROM DATABASE THAT IS FILTERED

        const listOfMedication = medication.map((medic) => {
            return (
                <ul key={medic.MedicationID}>{medic.MedicationName}, Dosage: {medic.Dosage}, Instruction: {medic.Instruction}</ul>
            );
        });

        return (
            <div>{listOfMedication}</div>
        );
    }

    function NutritionList({ resident }) {
        // RETRIVE THIS FROM DATABASE THAT IS FILTERED

        const listOfMedication = nutrition.map((nutri) => {
            return (
                <ul key={nutri.NutritionID} >Instruction: {nutri.Instruction}</ul>
            );
        });

        return (
            <div>{listOfMedication}</div>
        );
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
                    <MedicationList resident={resident} />

                    <p>Nutrition:</p>
                    <NutritionList resident={resident} />

                    <p>Care Instruction</p>
                    <ul>{resident.CareInstructions}</ul>

                    <p>Location:  {resident.LocationID}</p>

                    <p>Sensor:  {resident.SensorID}</p>
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

export default Resident;