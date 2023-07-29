import { useEffect, useState } from "react";
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
import LoadingContainer from "../LoadingContainer/LoadingContainer";
import Chat from "../Chat";

import { Link } from "react-router-dom";


const ShopLayout = ({ children, requireLogin }) => {

    const navigate = useNavigate();
    const { account } = useSelector(state => state.account);
    const { isAppLoading } = useSelector(state => state.app)

    useEffect(() => {
        if (requireLogin) {
            if (!account) {
                navigate("/login")
            }
        }
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    return (
        <>
            {isAppLoading && <LoadingContainer />}
            <div style={{ height: isAppLoading ? 0 : undefined, overflow: "hidden" }}>
                <div className="flex flex-col items-center w-full">
                    <Header />
                    {children}
                    <Footer />
                    <MenuLeft />
                    <SearchRight />
                    <CartRight />
                    <ScrollToTop />
                    <Chat />
                    <UtilComponents />
                </div>
            </div>

        </>
    );
}

export default ShopLayout