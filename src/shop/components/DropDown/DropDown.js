import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useSpring, animated } from "@react-spring/web";

const DropDown = ({ component, render, ref }) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        ref.current = {
            show: () => {
                setShow(true);
            },
            hide: () => {
                setShow(false);
            }
        }
    }, [])

    return (
        <div>
            <Tippy
                interactive={true}
                visible
                render={attrs => (
                    <animated.div
                        {...attrs}
                        className="w-10 h-10 bg-red-500">
                        {render}
                    </animated.div>
                )}>
                {component}
            </Tippy>
        </div>
    );
}

export default DropDown