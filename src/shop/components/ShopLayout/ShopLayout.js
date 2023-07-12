import { useEffect } from "react";
import CartRight from "../CartRight";
import Footer from "../Footer";
import Header from "../Header";
import MenuLeft from "../MenuLeft";
import ScrollToTop from "../ScrollToTop";
import SearchRight from "../SearchRight";
import { UtilComponents } from "../../share/Utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";


const ShopLayout = ({ children, requireLogin }) => {

    const navigate = useNavigate();
    const { account } = useSelector(state => state.account);

    useEffect(() => {
        if (requireLogin) {
            if (!account) {
                navigate("/login")
            }
        }
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    return (
        <>
            <div className="flex flex-col items-center w-full">
                <Header />
                {children}
                <Footer />
                <MenuLeft />
                <SearchRight />
                <CartRight />
                <ScrollToTop />
                <UtilComponents />
            </div>
        </>
    );
}

export default ShopLayout