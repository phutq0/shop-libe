import { useNavigate, useParams } from "react-router-dom";
import className from "./className";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import Information from "./components/Information";
import Addresses from "./components/Addresses";
import History from "./components/History";
import { setAccount } from "../../share/slices/Account";

const Account = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { type } = useParams();

    const Content = (() => {
        if (type == "addresses") {
            return Addresses;
        }
        if (type == "history") {
            return History;
        }
        return Information;
    })();

    const handleLogout = () => {
        dispatch(setAccount(null));
        localStorage.removeItem("account");
        navigate("/");
    }

    return (
        <div className={className.container}>
            <div className={className.title}>ACCOUNT</div>
            <div
                className={className.buttonLogout}
                onClick={handleLogout}>
                LOG OUT
            </div>
            <div className={className.content}>
                <NavBar
                    type={type} />
                <Content />
            </div>
        </div>
    );
}

export default Account