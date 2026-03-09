import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { callApi } from "../../utils/Utils";
import LoadApi from "../Loading/LoadApi";
import ImgLogo from "/src/assets/img/logo.webp";
import IconClose from "/src/assets/svg/close.svg";
import IconEye from "/src/assets/svg/eye.svg";
import IconEyeSlash from "/src/assets/svg/eye-slash.svg";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const { contextData, updateSession } = useContext(AppContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && usernameRef.current) usernameRef.current.focus();
        if (isOpen) setErrorMsg("");
    }, [isOpen]);

    useEffect(() => {
        function onKey(e) {
            if (e.key === 'Escape') onClose();
        }
        if (isOpen) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const body = {
            username: username,
            password: password,
            site_label: "main",
        };

        callApi(
            contextData,
            "POST",
            "/login/",
            callbackSubmitLogin,
            JSON.stringify(body)
        );
    };

    const callbackSubmitLogin = (result) => {
        setIsLoading(false);
        if (result.status === "success") {
            localStorage.setItem("session", JSON.stringify(result));
            updateSession(result);

            if (onLoginSuccess) {
                onLoginSuccess(result.user.balance);
            }
            setTimeout(() => {
                onClose();
            }, 1000);
        } else if (result.status === "country") {
            setErrorMsg(result.message);
        } else {
            setErrorMsg("Combinación de nombre de usuario y contraseña no válida.");
        }
    };


    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center z-1000 justify-center h-full w-full"
        >
            <div
                className="background relative w-full m-2 rounded-lg max-w-xl shadowModals h-3/4 px-10 flex flex-col justify-center items-center"
            >
                <div className="flex justify-end items-center mb-4">
                    <button
                        className="text-gray-400 hover:text-bodyText transition duration-300 ease-in-out absolute top-5 right-5"
                        onClick={() => onClose()}
                    >
                        <img src={IconClose} className="w-8 h-8" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center mb-4 gap-6">
                        <a onClick={() => navigate("/")} className="router-link-active router-link-exact-active">
                            <img
                                loading="lazy"
                                src={ImgLogo}
                                className="w-64 h-auto md:w-96"
                                alt="Bet30"
                            />
                        </a>
                        <p className="text-center text-sm md:text-lg text-white">
                            Ingrese su usuario y contraseña para empezar a jugar
                        </p>
                    </div>
                    <div className="mb-4 mt-14">
                        <input
                            type="text"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-bodyText leading-tight focus:outline-none focus:shadow-outline bg-inputBackground border-inputBorder placeholder-gray-400"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <div className="relative w-full">
                            <input
                                id="password"
                                className="shadow appearance-none border rounded w-full py-2 pl-2 pr-10 text-bodyText leading-tight focus:outline-none focus:shadow-outline bg-inputBackground border-inputBorder placeholder-gray-400"
                                placeholder="Contraseña"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 bottom-3 text-gray-400 hover:text-bodyText transition duration-300 ease-in-out"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img src={showPassword ? IconEyeSlash : IconEye} />
                            </button>
                        </div>
                    </div>
                    {
                        errorMsg && 
                        <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-400 text-sm">
                            {errorMsg}
                        </div>
                    }
                    <button
                        type="submit"
                        className="bg-button text-bodyText font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out transform"
                    >
                        <span>{isLoading ? <LoadApi /> : "Entrar"}</span>
                    </button>
                </form>
            </div>
        </div>

    );
};

export default LoginModal;