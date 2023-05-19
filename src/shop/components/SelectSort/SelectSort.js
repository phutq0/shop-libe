import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { animated, useSpring } from "@react-spring/web";
import _ from "lodash";

import className from "./className";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


const SelectSort = ({ classNames, data, onSelected, currentValue }) => {

    const [show, setShow] = useState(false);
    const [style, spring] = useSpring(() => ({
        transform: "scaleY(0)",
        transformOrigin: 'top'
    }));

    const onMount = () => {
        spring.start({
            transform: "scaleY(1)",
            config: {
                duration: 200,
                tension: 500
            }
        });
    }

    const ref = useRef();

    const onHide = () => {
        spring.start({
            transform: "scaleY(0)",
            config: {
                duration: 200,
                tension: 500
            }
        });
    }

    // useEffect(() => {
    //     const h = () => {
    //         console.log(Math.random(), { ok: ref.current })
    //     }
    //     window.addEventListener("scroll", h);
    //     return () => {
    //         window.removeEventListener("scroll", h)
    //     }
    // }, []);

    return (
        <div className={className.wrapper + " " + classNames}>
            <Tippy

                interactive={true}
                visible={show}
                placement={"bottom-end"}
                onClickOutside={() => setShow(false)}
                animation={true}
                onMount={onMount}
                onHide={onHide}
                render={att => (
                    <animated.div
                        {...att}
                        className={className.content}
                        style={style}>
                        {data.map((item, index) => (
                            <div
                                key={item.id ?? index}
                                className={className.item}
                                onClick={() => {
                                    if (_.isFunction(onSelected)) {
                                        onSelected(item);
                                    }
                                    setShow(false);
                                }}>
                                {item.display}
                            </div>
                        ))}
                    </animated.div>
                )}>
                <div
                    className={className.button}
                    ref={ref}
                    onClick={() => setShow(!show)}>
                    {currentValue}
                    <FontAwesomeIcon
                        className={className.icon}
                        icon={faCaretDown} />
                </div>
            </Tippy>
        </div>
    )
}

export default SelectSort