import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Registration = () => {
    const navigate = useNavigate();
    const [userID, setUserID] = useState("");
    const [userType, setUserType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [hasErrors, setHasErrors] = useState(true);



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

        if (userID == null || userID === "") {
            valid = false;
            setHasErrors(valid);
            console.log("username error")
            return false;
        } else {
            valid = true;
        }

        if (username == null || username === "") {
            valid = false;
            setHasErrors(valid);
            console.log("username error")
            return false;
        } else {
            valid = true;
        }

        if (password == null || password === "") {
            valid = false;
            setHasErrors(valid);
            console.log("password error")
            return false;
        } else {
            valid = true;
        }

        if (password !== confirmPassword) {
            valid = false;
            setHasErrors(valid);
            console.log("confirm password error");
            return false;
        } else {
            valid = true;
        }

        if (firstName == null || firstName === "") {
            valid = false;
            setHasErrors(valid);
            console.log("fname error")
            return false;
        } else {
            valid = true;
        }

        if (lastName == null || lastName === "") {
            valid = false;
            setHasErrors(valid);
            console.log("lname error")
            return false;
        } else {
            valid = true;
        }

        if (userType == null || userType === "") {
            valid = false;
            setHasErrors(valid);
            console.log("acc type error")
            return false;
        } else {
            valid = true;
        }

        if (birthday == null || birthday === "") {
            valid = false;
            setHasErrors(valid);
            console.log("lname error")
            return false;
        } else {
            valid = true;
        }

        if (gender == null || gender === "") {
            valid = false;
            setHasErrors(valid);
            console.log("lname error")
            return false;
        } else {
            valid = true;
        }

        if (phoneNumber == null || phoneNumber === "") {
            valid = false;
            setHasErrors(valid);
            console.log("lname error")
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
                firstName: firstName, lastName: lastName, username: username, password: password,
                phoneNumber: phoneNumber, gender: gender, birthday: birthday, userID: userID, userType: userType
            };

            console.log(newData)
            addData(newData);
            navigate("/login");
        }
    };


    return (
        <div>
            <p>Registration</p>

            <div className="row d-flex justify-content-center">
                <div className="col-md-8">

                    <Warning check={hasErrors} />

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-1">User ID</label>
                            <input
                                type="text"
                                name="userID"
                                className="form-control"
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">Username</label>
                            <input
                                type="text"
                                name="Username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                name="Password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="label">Confirm Password</label>
                            <input
                                type="password"
                                name="ConfirmPassword"
                                className="form-control"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">First Name</label>
                            <input
                                type="text"
                                name="FirstName"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">Last Name</label>
                            <input
                                type="text"
                                name="LastName"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">Gender</label>
                            <input
                                type="text"
                                name="Gender"
                                className="form-control"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">Birthday</label>
                            <input
                                type="text"
                                name="Birthday"
                                className="form-control"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="LastName"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="label">Select User Type</label>
                            <select onChange={(e) => setUserType(e.target.value)} defaultValue="" className="form-control">
                                <option>Select User Type</option>
                                <option value="caretaker">Caretaker</option>
                                <option value="doctor">Doctor</option>
                                <option value="family">Family</option>
                                <option value="resident">Resident</option>
                            </select>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>

                    <div className="m-5">
                        <Button onClick={() => {
                            navigate("/login");
                        }}>
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>


        </div>
    )

};

// Access the API based on the button action and use POST Method
// Requires the data
async function addData(data) {
    let address = "/CareSense/api/user";

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
}

export default Registration;