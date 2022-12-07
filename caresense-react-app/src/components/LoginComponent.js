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
            sessionStorage.setItem("userType", loggedUser.userType);
            console.log("Login Successful: " + authenticated + " " + userType);

            const fakeresident = { userID: 1, locationID: 1, sensorID: 1 }
            console.log(loggedUser)
            if (userType === "admin") {
                navigate("/admin", { state: { user: loggedUser } });
            } else if (userType === "resident") {
                navigate("/myresident", { state: { user: loggedUser, resident: fakeresident } });
            } else {
                navigate("/", { state: { user: loggedUser } });
            }
        }
    }, [userType, authenticated, loginStatus, loggedUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoggedUser({})
        setLoginStatus(false);

        let address = "CareSense/api/login";
        // address should change depending on userType  

        //let loginData = { Username: username, Password: password }; // contains  user and password STRING

        const xmlBody = "<?xml version='1.0'?><query>" +
            "<username>" + username + "</username>" +
            "<password>" + password + "</password>" +
            "</query>";
        console.log(xmlBody);

        try {
            const res = await fetch(address, {
                method: "post",
                headers: {
                    "Content-Type": "text/xml",
                    "Access-Control-Request-Origin": "http://localhost:8080",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Allow-Headers":
                        "Origin, X-Requested-With, Content-Type, Accept"
                },
                body: xmlBody
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                setUsername("");
                setPassword("")
                throw new Error(message);
            } else {
                const xmlBody = await res.text();
                console.log(xmlBody);

                const parser = new DOMParser();
                const doc = parser.parseFromString(xmlBody, "application/xml");
                // print the name of the root element or error message
                const errorNode = doc.querySelector("parsererror");
                if (errorNode) {
                    console.log("error while parsing");
                } else {
                    const newUser = {
                        userID: doc.getElementsByTagName("userID")[0].childNodes[0].textContent,
                        userType: doc.getElementsByTagName("userType")[0].childNodes[0].textContent,
                        username: username,
                        password: password,
                        firstName: doc.getElementsByTagName("firstName")[0].childNodes[0].textContent,
                        lastName: doc.getElementsByTagName("lastName")[0].childNodes[0].textContent,
                        gender: doc.getElementsByTagName("gender")[0].childNodes[0].textContent,
                        birthday: doc.getElementsByTagName("birthday")[0].childNodes[0].textContent,
                        phoneNumber: doc.getElementsByTagName("phoneNumber")[0].childNodes[0].textContent
                    }
                    //console.log(newUser);

                    setLoggedUser(newUser);
                    if (Object.keys(newUser).length !== 0) {
                        setLoginStatus(true);
                        setUserType(doc.getElementsByTagName("userType")[0].childNodes[0].textContent);
                    }
                }
            }

        } catch (err) {
            setLoggedUser({});
            setLoginStatus(false);
            console.log(err.message);
        }
        // create if statement depending on account type (Family, Doctor, Caretaker, Admin)
    };

    return (
        <div>


            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <h5>Login</h5>
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>

            <div className="m-5">
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