import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const RegisterResident = () => {
    const navigate = useNavigate();
    // Get the User state from Login Component
    const stateLoc = useLocation();
    const user = stateLoc.state.user;

    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [hasErrors, setHasErrors] = useState(true);
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [doctorID, setDoctorID] = useState("");
    const [familyID, setFamilyID] = useState(user.ID);
    const [sensorID, setSensorID] = useState("");
    const [locationID, setLocationID] = useState("");
    const [careInstructions, setCareInstructions] = useState("");

    useEffect(() => {

    }, []);

    function Warning(props) {
        //console.log(props.check);
        if (props.check) {
            return null;
        } else {
            return (
                <div className="alert alert-warning">There are some errors on the form.</div>
            );
        }
    }

    const handleValidation = (e) => {
        let valid = true;

        if (fname == null || fname === "") {
            valid = false;
            setHasErrors(valid);
            return false;
        } else {
            valid = true;
        }

        if (lname == null || lname === "") {
            valid = false;
            setHasErrors(valid);
            return false;
        } else {
            valid = true;
        }

        if (age == null || age === "") {
            valid = false;
            setHasErrors(valid);
            return false;
        } else {
            valid = true;
        }

        if (sex == null || sex === "") {
            valid = false;
            setHasErrors(valid);
            return false;
        } else {
            valid = true;
        }

        if (doctorID == null || doctorID === "") {
            valid = false;
            setHasErrors(valid);
            return false;
        } else {
            valid = true;
        }

        if (sensorID == null || sensorID === "") {
            valid = false;
            setHasErrors(valid);
            return false;
        } else {
            valid = true;
        }

        if (locationID == null || locationID === "") {
            valid = false;
            setHasErrors(valid);
            return false;
        } else {
            valid = true;
        }

        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (handleValidation()) {
            // create if statement depending on account type (Family, Doctor, Caretaker, Admin)
            // ADD THE ACCOUNT TO THE DATABASE
            let newData = {
                Fname: fname, Lname: lname, Sex: sex, Age: age,
                FamilyID: familyID, DoctorID: doctorID, SensorID: sensorID, LocationID: locationID,
                CareInstructions: careInstructions
            };

            addData(newData)
            navigate("/", { state: { user: user } });
        }
    };

    return (
        <div>
            <p>Welcome to Care Sense, {user.Username}, ID: {user.ID} <Button onClick={() => {
                sessionStorage.setItem("authenticated", false);
                sessionStorage.setItem("accountType", "");
                console.log("Logout Successful");
                navigate("/login");
            }}>
                Logout
            </Button>
            </p>

            <p>Register a Resident</p>

            <div className="row d-flex justify-content-center">
                <div className="col-md-8">

                    <Warning check={hasErrors} />

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-1">First Name</label>
                            <input
                                type="text"
                                name="FirstName"
                                className="form-control"
                                value={fname}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">Last Name</label>
                            <input
                                type="text"
                                name="LastName"
                                className="form-control"
                                value={lname}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">Sex</label>
                            <input
                                type="text"
                                name="Sex"
                                className="form-control"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">Age</label>
                            <input
                                type="text"
                                name="Age"
                                className="form-control"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">FamilyID</label>
                            <span>: {familyID}</span>
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">DoctorID</label>
                            <input
                                type="text"
                                name="DoctorID"
                                className="form-control"
                                value={doctorID}
                                onChange={(e) => setDoctorID(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">SensorID</label>
                            <input
                                type="text"
                                name="SensorID"
                                className="form-control"
                                value={sensorID}
                                onChange={(e) => setSensorID(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">LocationID</label>
                            <input
                                type="text"
                                name="LocationID"
                                className="form-control"
                                value={locationID}
                                onChange={(e) => setLocationID(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">CareInstructions</label>
                            <textarea
                                type="textarea"
                                name="CareInstructions"
                                className="form-control"
                                value={careInstructions}
                                onChange={(e) => setCareInstructions(e.target.value)}
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>
                </div>
            </div>

            <div>
                <Button onClick={() => {
                    navigate("/", { state: { user: user } });
                }}>
                    Back to Home
                </Button>
            </div>


        </div>
    )

};

// Access the API based on the button action and use POST Method
// Requires the API name, data
async function addData(data) {
    let address = "http://localhost:8080/CareSense/api/resident";

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

export default RegisterResident;