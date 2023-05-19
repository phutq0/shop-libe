import { useEffect } from "react";
import CartRight from "../CartRight";
import Footer from "../Footer";
import Header from "../Header";
import MenuLeft from "../MenuLeft";
import ScrollToTop from "../ScrollToTop";
import SearchRight from "../SearchRight";

const ShopLayout = ({ children }) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: "smooth"
        });
    });

    return (
        <div className="flex flex-col items-center w-full">
            <Header />
            {children}
            <Footer />
            <MenuLeft />
            <SearchRight />
            <CartRight />
            <ScrollToTop />
        </div>
    );
}

export default ShopLayout