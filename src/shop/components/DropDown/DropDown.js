import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useSpring, animated } from "@react-spring/web";
import { useResizeDetector } from "react-resize-detector";
import _ from "lodash";

const DropDown = ({ component, render, placement = "bottom-end", transformOrigin = "top", className, disable = false }) => {

    const [show, setShow] = useState(false);
    const [style, spring] = useSpring(() => ({
        transform: "scaleY(0)"
    }));

    const { width, ref } = useResizeDetector()

    const onMount = () => {
        spring.start({
            transform: "scaleY(1)",
            config: { duration: 100 }
        });
    }

    const onHide = ({ unmount }) => {
        spring.start({
            transform: "scaleY(0)",
            onRest: unmount,
            config: { duration: 100, clamp: true }
        })
    }

    return (
        <div className={className} ref={ref}>
            <Tippy
                interactive={true}
                visible={show}
                // onBeforeUpdate={e => console.log(e.popper.style.cssText)}
                placement={placement}
                onClickOutside={() => setShow(false)}
                animation={true}
                onMount={onMount}
                onHide={onHide}
                render={attrs => (
                    <animated.div
                        style={{
                            ...style,
                            transformOrigin: transformOrigin,
                            width: width
                        }}
                        onClick={() => setShow(!show)}
                        {...attrs}>
                        {render}
                    </animated.div>
                )}>
                <div
                    className={disable ? "cursor-default" : "cursor-pointer"}
                    onClick={() => disable ? 1 : setShow(!show)}>
                    {_.isFunction(component) ? component(show) : component}
                </div>
            </Tippy >
        </div >
    )
}

export default DropDown