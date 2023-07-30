import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useSpring, animated } from "@react-spring/web";

const DropDown = ({ component, render, placement = "bottom-end", transformOrigin = "top", className }) => {

    const [show, setShow] = useState(false);
    const [style, spring] = useSpring(() => ({
        transform: "scaleY(0)"
    }));

    const onMount = () => {
        spring.start({
            transform: "scaleY(1)",
            config: { duration: 100 }
        });
    }

    const onHide = ({ unmount }) => {
        spring.start({
            transform: "scaleY(0)",
            config: { duration: 100, clamp: true }
        })
    }

    return (
        <div className={className}>
            <Tippy
                interactive={true}
                visible={show}
                placement={placement}
                onClickOutside={() => setShow(false)}
                animation={true}
                onMount={onMount}
                onHide={onHide}
                render={attrs => (
                    <animated.div
                        style={{
                            ...style,
                            transformOrigin: transformOrigin
                        }}
                        onClick={() => setShow(!show)}
                        {...attrs}>
                        {render}
                    </animated.div>
                )}>
                <div onClick={() => setShow(!show)}>
                    {component}
                </div>
            </Tippy>
        </div>
    )
}

export default DropDown