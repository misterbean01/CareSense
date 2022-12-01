import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Registration = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [hasErrors, setHasErrors] = useState(true);
    const [accountType, setAccountType] = useState("");


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

        if (fname == null || fname === "") {
            valid = false;
            setHasErrors(valid);
            console.log("fname error")
            return false;
        } else {
            valid = true;
        }

        if (lname == null || lname === "") {
            valid = false;
            setHasErrors(valid);
            console.log("lname error")
            return false;
        } else {
            valid = true;
        }

        if (accountType == null || accountType === "") {
            valid = false;
            setHasErrors(valid);
            console.log("acc type error")
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
            let newData = { Fname: fname, Lname: lname, Username: username, Password: password };

            console.log(newData)
            addData(accountType, newData);
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
                            <label className="label">Select Account Type</label>
                            <select onChange={(e) => setAccountType(e.target.value)} defaultValue="" className="form-control">
                                <option>Select Account Type</option>
                                <option value="caretaker">Caretaker</option>
                                <option value="doctor">Doctor</option>
                                <option value="family">Family</option>
                            </select>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>

                    <div>
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

export default Registration;