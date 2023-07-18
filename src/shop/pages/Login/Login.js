import { useEffect, useLayoutEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as EmailValidator from 'email-validator';

import className from "./className"
import { setAccount } from "../../share/slices/Account";
import Utils from "../../share/Utils";
import Api from "../../api";


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { account } = useSelector(state => state.account);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isButtonActive = (() => {
        if (!email || !password) {
            return false;
        }
        return EmailValidator.validate(email);
    })();

    const handleClickLogin = async () => {
        Utils.showLoading();
        const response = await Api.auth.login({
            email,
            password
        });
        await Utils.wait(1000);
        console.log("response", response);
        if (response.result == Api.RESULT_CODE.SUCCESS) {
            localStorage.setItem('account', JSON.stringify({ email, password }));
            Utils.global.accessToken = response.data.access_token;
            dispatch(setAccount(response.data.userInfo));
            navigate(Utils.global.nextPath ?? "/");
            Utils.hideLoading();
        }
        else {
            Utils.hideLoading();
            if (response.data.message) {
                if (response.data.message != "Unauthorized") {
                    Utils.showToastError("Password is incorrect!")
                }
                else {
                    Utils.showToastError("Can not find this account!");
                }
            }
            else {
                Utils.showToastError("Can not find this account!");
            }
        }
        Utils.hideLoading();
    }

    useLayoutEffect(() => {
        if (account) {
            navigate(Utils.global.nextPath ?? "/");
        }
    }, [account]);

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
                        className={isButtonActive ? className.buttonLogin : className.buttonLoginDisable}
                        onClick={isButtonActive ? handleClickLogin : undefined}>LOGIN</div>
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