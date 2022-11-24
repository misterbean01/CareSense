import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("");
    // store the login authenticated flag locally
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated") || false));

    // remove with getUser
    const users = [{ Username: "aaa", Password: "aaa" }];

    const handleSubmit = (e) => {
        e.preventDefault()

        // replace with getUser
        const account = users.find((user) => user.Username === username);

        // check of account type

        if (account && account.Password === password) {
            setAuthenticated(true)
            sessionStorage.setItem("authenticated", true);
            sessionStorage.setItem("accountType", accountType);
            console.log("Login Successful: " + authenticated + " " + accountType);

            // Navigate to homepage and send the logged in user
            if (accountType !== "admin") {
                navigate("/", { state: { user: { Username: "aaa", Password: "aaa" } } });
            } else {
                navigate("/admin", { state: { user: { Username: "aaa", Password: "aaa" } } });
            }

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