import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import className from "./className"
import { setAccount } from "../../share/slices/Account";


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        if (email && password) {
            dispatch(setAccount({
                email,
                password
            }));
            navigate("/");
        }
    }

    return (
        <div className={className.container}>
            <div className={className.left}>
                <div className={className.login}>Login</div>
            </div>
            <div className={className.right}>
                <div className={className.border}>
                    <input
                        placeholder={"Email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={className.input} />
                    {email.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setEmail("")}
                            className={className.clear}
                            icon={faCircleXmark} />
                    )}
                </div>
                <div className={className.border}>
                    <input
                        placeholder={"Password"}
                        value={password}
                        type={"password"}
                        onChange={e => setPassword(e.target.value)}
                        className={className.input} />
                    {password.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setPassword("")}
                            className={className.clear}
                            icon={faCircleXmark} />
                    )}
                </div>
                <div className={className.action}>
                    <div
                        className={className.buttonLogin}
                        onClick={login}>LOGIN</div>
                    <div className={className.action2}>
                        <div className={className.forgot}>Forgot password?</div>
                        <div className={className.row}>
                            or
                            <div
                                className={className.signup}
                                onClick={() => navigate("/register")}>
                                Sign up
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login