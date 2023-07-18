import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "./className"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { product1 } from "../../../../components/Image";
import { useState } from "react";
import { useSelector } from "react-redux";

const Information = () => {

    const { account } = useSelector(state => state.account);

    const [lastName, setLastName] = useState(account?.lastName ?? "");
    const [firstName, setFirstName] = useState(account?.firstName ?? "");
    const [gender, setGender] = useState(() => {
        const genders = {
            "unset": 0,
            "female": 1,
            "male": 2
        }
        if (account) {
            return genders[account.gender]
        }
        return 0;
    });
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState(account?.email ?? "");

    return (
        <div className={className.wrapper}>
            <div className={className.top}>
                <label
                    htmlFor="inputAvatar">
                    <img
                        className={className.avatar}
                        src={product1}
                    />
                </label>
                <input
                    className={"hidden"}
                    type="file"
                    accept="image/png, image/jpeg"
                    id="inputAvatar"
                    onChange={e => {
                        const tmp = e.target.files[0];
                        if (tmp) {
                            const url = URL.createObjectURL(tmp);
                            const image = document.getElementsByClassName(className.avatar)[0];
                            image.src = url;
                        }
                    }} />
                <label
                    className={className.buttonSelect}
                    htmlFor="inputAvatar">
                    SELECT
                </label>
            </div>
            <div className={className.row}>
                <div className={className.label}>
                    Last Name:
                </div>
                <div className={className.border}>
                    <input
                        className={className.input}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Last Name" />
                    {lastName.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setLastName("")}
                            className={className.clear}
                            icon={faCircleXmark} />
                    )}
                </div>
            </div>
            <div className={className.row}>
                <div className={className.label}>
                    First Name:
                </div>
                <div className={className.border}>
                    <input
                        className={className.input}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="First Name" />
                    {firstName.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setFirstName("")}
                            className={className.clear}
                            icon={faCircleXmark} />
                    )}
                </div>
            </div>
            <div className={className.row}>
                <div className={className.label}>
                    Email:
                </div>
                <div className={className.border}>
                    <input
                        className={className.input}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email" />
                    {email.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setEmail("")}
                            className={className.clear}
                            icon={faCircleXmark} />
                    )}
                </div>
            </div>
            <div className={className.row}>
                <div className={className.label}>
                    Birthday:
                </div>
                <div className={className.border}>
                    <input
                        className={className.input2}
                        value={birthday}
                        type={"date"}
                        onChange={e => setBirthday(e.target.value)}
                        placeholder="Birthday" />
                    {birthday.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setBirthday("")}
                            className={className.clear2}
                            icon={faCircleXmark} />
                    )}
                </div>
            </div>
            <div className={className.row2}>
                <div className={className.label}>
                    Gender:
                </div>
                <div className={className.border2}>
                    <div
                        className={className.select}
                        onClick={() => setGender(1)}>
                        <input
                            className={className.checkbox}
                            readOnly={true}
                            checked={gender == 1}
                            type={"radio"} />
                        <div className={className.label2}>Female</div>
                    </div>
                    <div
                        className={className.select}
                        onClick={() => setGender(2)}>
                        <input
                            className={className.checkbox}
                            readOnly={true}
                            checked={gender == 2}
                            type={"radio"} />
                        <div className={className.label2}>Male</div>
                    </div>
                    <div
                        className={className.select}
                        onClick={() => setGender(0)}>
                        <input
                            className={className.checkbox}
                            readOnly={true}
                            checked={gender == 0}
                            type={"radio"} />
                        <div className={className.label2}>Unset</div>
                    </div>
                </div>
            </div>
            <div className={className.buttonSave}>SAVE</div>
        </div>
    );
}

export default Information