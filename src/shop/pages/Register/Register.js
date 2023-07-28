import { useLayoutEffect, useState } from "react"
import className from "./className"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Utils from "../../share/Utils";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../../share/slices/Account";
import { useNavigate } from "react-router-dom";
import Api from "api2";

const genders = {
    0: "unset",
    1: "female",
    2: "male",
}

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { account } = useSelector(state => state.account);

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [gender, setGender] = useState(1);
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isButtonActive = (() => {
        if (!lastName || !firstName || !birthday || !email || !password) {
            return false;
        }
        return true;
    })();

    const handleClick = async () => {
        Utils.showLoading();
        const response = Api.account.register({
            lastName,
            firstName,
            gender: genders[gender],
            dateOfBirth: birthday,
            password,
            email,
            status: false,
            role: 1,
            // avatarUrl: ""
        });
        await Utils.wait(1000);
        Utils.hideLoading();
        console.log("response", response);
        if (response.result == "success") {
            const response1 = Api.account.login({
                email,
                password
            });
            console.log("response1", response1);
            if (response1.result == "success") {
                localStorage.setItem('account', JSON.stringify(response1.account));
                dispatch(setAccount(response1.account));
                navigate(Utils.global.nextPath ?? "/");
                Utils.hideLoading();
            }
        }
        else {
            Utils.showToastError(response?.message)
        }
    }

    useLayoutEffect(() => {
        if (account) {
            navigate(Utils.global.nextPath ?? "/");
        }
    }, [account]);

    return (
        <div className={className.container}>
            <div className={className.left}>
                <div className={className.login}>Sign Up</div>
            </div>
            <div className={className.right}>
                <div className={className.border}>
                    <input
                        placeholder={"Last Name"}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className={className.input} />
                    {lastName.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setLastName("")}
                            className={className.clear}
                            icon={faCircleXmark} />
                    )}
                </div>
                <div className={className.border}>
                    <input
                        placeholder={"First Name"}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className={className.input} />
                    {firstName.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setFirstName("")}
                            className={className.clear}
                            icon={faCircleXmark} />
                    )}
                </div>
                <div className={className.gender}>
                    <div
                        className={className.select}
                        onClick={() => setGender(1)}>
                        <input
                            className={className.checkbox}
                            readOnly={true}
                            checked={gender == 1}
                            type={"radio"} />
                        <div className={className.label}>Female</div>
                    </div>
                    <div
                        className={className.select}
                        onClick={() => setGender(2)}>
                        <input
                            className={className.checkbox}
                            readOnly={true}
                            checked={gender == 2}
                            type={"radio"} />
                        <div className={className.label}>Male</div>
                    </div>
                </div>
                <div className={className.border}>
                    <input
                        placeholder={"Birthday"}
                        value={birthday}
                        type={"date"}
                        onChange={e => setBirthday(e.target.value)}
                        className={className.input2} />
                    {birthday.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setBirthday("")}
                            className={className.clear2}
                            icon={faCircleXmark} />
                    )}
                </div>
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
                        onClick={isButtonActive ? handleClick : undefined} >
                        {"SIGN UP"}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register