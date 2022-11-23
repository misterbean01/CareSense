import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            return false;
        } else {
            valid = true;
        }

        if (password == null || password === "") {
            valid = false;
            setHasErrors(valid);
            return false;
        } else {
            valid = true;
        }

        if (password === confirmPassword) {
            valid = false;
            setHasErrors(valid);
            return false;
        } else {
            valid = true;
        }

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

        if (accountType == null || accountType === "") {
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
            navigate("/login");
        }

        // create if statement depending on account type (Family, Doctor, Caretaker, Admin)
        // ADD THE ACCOUNT TO THE DATABASE
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
                            <select onChange={(e) => setAccountType(e.target.value)} className="form-control">
                                <option selected>Select Account Type</option>
                                <option value="caretaker">Caretaker</option>
                                <option value="grapefruit">Doctor</option>
                                <option value="family">Family</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>
                </div>
            </div>


        </div>
    )

};

export default Registration;