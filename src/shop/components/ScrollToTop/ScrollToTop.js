import { useEffect, useState } from "react";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import className from "./className";

function ScrollToTop() {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentHeight = window.scrollY;
            setShow(currentHeight > 0);
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div>
            <div
                className={
                    className.wrapper
                    + (show ? className.show : className.hidden)
                }
                onClick={() => window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })}>
                <FontAwesomeIcon icon={faAnglesUp} />
            </div>
        </div>
    );
}

export default ScrollToTop