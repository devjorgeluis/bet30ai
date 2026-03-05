import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { callApi } from "../utils/Utils";
import LoadApi from "../components/Loading/LoadApi";
import ImgLogo from "/src/assets/img/logo.png";
import ImgShow from "/src/assets/img/show-password.png";
import ImgHide from "/src/assets/img/hide-password.png";

const Login = () => {
    const { contextData, updateSession } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setIsLoading(true);
        setErrorMsg("");

        let body = {
            username: username,
            password: password,
            site_label: "main",
        };

        callApi(
            contextData,
            "POST",
            "/login",
            callbackSubmitLogin,
            JSON.stringify(body)
        );
    };

    const callbackSubmitLogin = (result) => {
        setIsLoading(false);
        if (result.status === "success") {
            localStorage.setItem("session", JSON.stringify(result));
            updateSession(result);

            setTimeout(() => {
                navigate(-1);
            }, 1000);
        } else if (result.status === "country") {
            setErrorMsg(result.message);
        } else {
            setErrorMsg("Nombre de usuario y contraseña no válidos");
        }
    };    

    useEffect(() => {
        const passwordInput = document.getElementById("password");
        if (passwordInput) {
            passwordInput.setAttribute("type", showPassword ? "text" : "password");
        }
    }, [showPassword]);

    return (
        <div id="app">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="logo">
                            <a className="navbar-brand" onClick={() => navigate("/")}>
                                <img
                                    title="Jugavip"
                                    alt="Jugavip"
                                    src={ImgLogo}
                                    className="max-h-full"
                                    style={{ width: "100%", maxWidth: 240 }}
                                />
                            </a>
                        </div>
                        <div className="card">
                            <div className="card-header">Acceso</div>
                            <div className="card-body">
                                <form method="POST">
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="username" className="col-form-label">Usuario</label>
                                            <input
                                                id="username"
                                                type="text"
                                                name="username"
                                                className={`form-control ${errorMsg && "is-invalid"}`}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                disabled={isLoading}
                                            />
                                            {
                                                errorMsg && 
                                                <span role="alert" className="invalid-feedback">
                                                    <strong>{errorMsg}</strong>
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="password" className="col-form-label">Contraseña</label>
                                            <div className="position-relative">
                                                <input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    className={`form-control ${errorMsg && "is-invalid"}`}
                                                    style={{ paddingRight: 38 }}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                                <img
                                                    src={showPassword ? ImgHide : ImgShow}
                                                    id="togglePassword"
                                                    alt="Contraseña"
                                                    className="toggle-password"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-0">
                                        <div className="col-md-12">
                                            <div className="user-cta-button-wrapper">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary login-btn"
                                                    onClick={handleSubmit}
                                                >
                                                    Acceso {isLoading && <LoadApi />}
                                                </button> 
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;