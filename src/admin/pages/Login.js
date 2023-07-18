import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    return (
        <div className={className.container}>
            <div className={className.content}>
                <div className={className.title}>LIBÉ</div>
                <div
                    className={className.row}
                    onClick={() => emailRef.current?.focus()}>
                    <div className={className.left}>Email:</div>
                    <div className={className.right}>
                        <input
                            ref={emailRef}
                            className={className.input}
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                        {email.length > 0 && (
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className={className.iconClear}
                                onClick={() => {
                                    setEmail("");
                                    emailRef.current?.focus();
                                }} />
                        )}
                    </div>
                </div>
                <div
                    className={className.row}
                    onClick={() => passwordRef.current?.focus()}>
                    <div className={className.left}>Password:</div>
                    <div className={className.right}>
                        <input
                            ref={passwordRef}
                            className={className.input}
                            value={password}
                            type={"password"}
                            onChange={e => setPassword(e.target.value)} />
                        {password.length > 0 && (
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className={className.iconClear}
                                onClick={() => {
                                    setPassword("");
                                    passwordRef.current?.focus();
                                }} />
                        )}
                    </div>
                </div>
                <div className={className.login}>
                    LOGIN
                </div>
            </div>
        </div>
    )
}

const className = {
    container: `w-full h-screen flex items-center justify-center px-4 md:px-0 bg-gray-100`,
    content: `w-full md:max-w-lg p-4 shadow-xl rounded border border-gray-200 flex flex-col items-center bg-white`,
    title: `font-bold text-4xl text-center mb-6`,
    row: `flex flex-row items-center mt-4 w-full`,
    left: `font-semibold text-sm min-w-[78px] text-right`,
    right: `flex-1 flex ml-3 h-10 border rounded relative`,
    input: `flex-1 pl-3 pr-6 bg-gray-100 outline-none focus-within:bg-white focus-within:border font-semibold text-sm`,
    iconClear: `absolute top-3 right-2 cursor-pointer text-gray-600 hover:opacity-70 text-sm`,
    login: `mt-6 flex w-1/2 items-center justify-center py-2 text-sm font-semibold rounded border border-gray-300 cursor-pointer hover:bg-black hover:text-white`
}

export default Login