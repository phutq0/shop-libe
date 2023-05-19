import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";

import className from "./className";
import { menuLeftRef } from "../MenuLeft";
import { searchRightRef } from "../SearchRight";
import { cartRightRef } from "../CartRight"
import { useSelector } from "react-redux";

const Header = () => {

    const navigate = useNavigate();
    const { account } = useSelector(state => state.account);

    return (
        <div className={className.wrapper}>
            <div className={className.left}>
                <div
                    className={className.btnMore}
                    onClick={() => menuLeftRef.current.show()}>
                    <FontAwesomeIcon
                        icon={faBars} />
                </div>
                <div
                    className={className.btnShop}
                    onClick={() => menuLeftRef.current.show()}>
                    SHOP
                </div>
                <div className={className.btnJoin}>JOIN OUT TEAM!</div>
            </div>
            <div className={className.center}>
                <div
                    className={className.logo}
                    onClick={() => navigate("/")}>LIBÉ</div>
            </div>
            <div className={className.right}>
                <div
                    className={className.cart}
                    onClick={() => cartRightRef.current.show()}>
                    <FontAwesomeIcon
                        icon={faCartShopping} />
                </div>
                <div
                    className={className.account}
                    onClick={() => {
                        if (!account) {
                            navigate("/login");
                        }
                        else {
                            navigate("/account");
                        }
                    }}>
                    <FontAwesomeIcon
                        icon={faUser} />
                </div>
                <div
                    className={className.search}
                    onClick={() => searchRightRef.current.show()}>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass} />
                </div>
            </div>
        </div>
    )
}

export default Header