import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    // store the login authenticated flag locally
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated") || false));
    const [loggedUser, setLoggedUser] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        if (loginStatus) {
            setAuthenticated(true)
            sessionStorage.setItem("authenticated", true);
            sessionStorage.setItem("userType", userType);
            console.log("Login Successful: " + authenticated + " " + userType);

            // console.log(loggedUser)
            // if (userType === "admin") {
            //     navigate("/admin", { state: { user: loggedUser } });
            // } else if (userType === "Resident") {
            //     navigate("/myresident", { state: { user: loggedUser } });
            // } else {
            //     navigate("/", { state: { user: loggedUser } });
            // }

            //delete this
            const fakeuser = { userID: 1, userType: "resident", username: "aaa", password: "aaa", firstName: "Harold", lastName: "Hide", birthday: "01-01-1991", gender: "Male", phoneNumber: "253-111-1111" }
            const fakeresident = { userID: 1, locationID: 1, sensorID: 1 }
            console.log(loggedUser)
            if (userType === "admin") {
                navigate("/admin", { state: { user: fakeuser } });
            } else if (userType === "Resident") {
                navigate("/myresident", { state: { user: fakeuser, resident: fakeresident } });
            } else {
                navigate("/", { state: { user: fakeuser } });
            }
        }
    }, [userType, authenticated, loginStatus, loggedUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoggedUser({})
        setLoginStatus(false);

        let address = "CareSense/api/home";
        // address should change depending on accounttype

        let loginData = { Username: username, Password: password }; // contains  user and password STRING
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
                body: JSON.stringify(loginData),
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
            const loggedUser = await res.json();
            setLoggedUser(loggedUser);
            console.log(loggedUser);
            if (Object.keys(loggedUser).length !== 0)
                setLoginStatus(true);
        } catch (err) {
            setLoggedUser({});
            setLoginStatus(false);
            console.log(err.message);
        }
        // create if statement depending on account type (Family, Doctor, Caretaker, Admin)

    };

    return (
        <div>
            <p>Login</p>

            <div className="row d-flex justify-content-center">
                <div className="col-md-6">

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
                            <select onChange={(e) => setUserType(e.target.value)} defaultValue="" className="form-control">
                                <option>Select Account Type</option>
                                <option value="caretaker">Caretaker</option>
                                <option value="doctor">Doctor</option>
                                <option value="familyMember">Family</option>
                                <option value="resident">Resident</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>

            <div>
                <Button onClick={() => {
                    navigate("/registration");
                }}>
                    Registration
                </Button>
            </div>

        </div >
    )
};

export default Login;