import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("");
    // store the login authenticated flag locally
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated") || false));
    const [user, setUser] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        if (loginStatus) {
            setAuthenticated(true)
            sessionStorage.setItem("authenticated", true);
            sessionStorage.setItem("accountType", accountType);
            console.log("Login Successful: " + authenticated + " " + accountType);

            if (accountType !== "admin") {
                navigate("/", { state: { user: { Username: "aaa", Password: "aaa", ID: 100 } } });
            } else {
                navigate("/admin", { state: { user: { Username: "aaa", Password: "aaa" } } });
            }
        }
    }, [accountType, authenticated, loginStatus, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUser({})
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
            setUser(loggedUser);
            //console.log(loggedUser);
            if (Object.keys(loggedUser).length !== 0)
                setLoginStatus(true);
        } catch (err) {
            setUser({});
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
                            <select onChange={(e) => setAccountType(e.target.value)} defaultValue="" className="form-control">
                                <option>Select Account Type</option>
                                <option value="caretaker">Caretaker</option>
                                <option value="doctor">Doctor</option>
                                <option value="family">Family</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>


        </div>
    )
};

export default Login;