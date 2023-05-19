import Marquees from "react-fast-marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import className from "./className";

const Marquee = () => {

    return (
        <Marquees
            className={className.wrapper}
            direction="right"
            speed={60}>
            <div className={className.content}>
                <FontAwesomeIcon
                    className="ml-2"
                    icon={faArrowRight} />
                <FontAwesomeIcon
                    className="mr-2"
                    icon={faArrowRight} />
                <div className="font-bold">BIRTHDAY SALE</div>
                <FontAwesomeIcon
                    className="ml-2 mr-2"
                    icon={faArrowRight} />
                <div>BIRTHDAY SALE</div>
            </div>
        </Marquees>
    )
}

export default Marquee