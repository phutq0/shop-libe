import { useNavigate, useParams } from "react-router-dom";
import className from "./className";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import Information from "./components/Information";
import Addresses from "./components/Addresses";
import History from "./components/History";

const Account = () => {

    const navigate = useNavigate();

    const { type } = useParams();
    // const type = "";

    const { account } = useSelector(state => state.account);
    const Content = (() => {
        if (type == "addresses") {
            return Addresses;
        }
        if (type == "history") {
            return History;
        }
        return Information;
    })();

    useLayoutEffect(() => {
        if (!account) {
            // navigate("/login")
        }
    })

    return (
        <div className={className.container}>
            <div className={className.title}>ACCOUNT</div>
            <div className={className.content}>
                <NavBar
                    type={type} />
                <Content />
            </div>
        </div>
    );
}

export default Account