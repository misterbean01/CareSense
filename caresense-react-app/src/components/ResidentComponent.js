import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { useLocation } from "react-router-dom";

const Resident = () => {
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("authenticated"));
    const residentLoc = useLocation();
    const resident = residentLoc.state.resident;

    useEffect(() => {

    }, []);


    if (!authenticated) {
        return <Navigate replace to="/login" />; // redirect to the login page if not authenticated
    } else {
        return (
            <div>

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
                <p>insert list of medication</p>

                <p>Location:  {resident.LocationID}</p>

                <p>Sensor:  {resident.SensorID}</p>
            </div>
        );
    }
};

export default Resident;