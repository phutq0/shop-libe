import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { createRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

import className from "./className";
import { useNavigate } from "react-router-dom";

const menuLeftRef = createRef();

const MenuLeft = () => {

    const navigate = useNavigate();

    const [showShop, setShowShop] = useState(false);
    const [showTop, setShowTop] = useState(false);
    const [show, setShow] = useState(false);

    const [menuLeftStyle, springMenuLeft] = useSpring(() => ({
        transform: "translateX(-100%)"
    }));

    const startShowMenuLeft = () => {
        springMenuLeft.start({
            transform: "translateX(0%)",
            config: {
                duration: 250,
            }
        });
    }
    const startHideMenuLeft = () => {
        springMenuLeft.start({
            transform: "translateX(-100%)",
            config: {
                duration: 250,
            }
        });
    }

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = "8px";
        }
        else {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        }
    }, [show]);

    const [shopStyle, springShop] = useSpring(() => ({
        height: 0
    }));
    const startShowShop = () => {
        springShop.start({
            height: 32 * (7 * showShop + 3 * showTop),
            config: {
                duration: 250,
            }
        });
        springTop.start({
            height: 28 * 3 * showTop,
            config: {
                duration: 250,
            }
        });
    }
    const [topStyle, springTop] = useSpring(() => ({
        height: 0
    }));
    useEffect(() => {
        menuLeftRef.current = {
            show: () => {
                startShowMenuLeft();
                setShow(true);
            }
        }
    });
    startShowShop();

    const goTo = (path) => {
        navigate(path);
        startHideMenuLeft();
        setShow(false);
    }

    return (
        <div className={className.wrapper}>
            {show && (
                <div className={className.overlay} onClick={() => {
                    startHideMenuLeft();
                    if (showShop) {
                        setShowTop(false);
                        setShowShop(false);
                        setShow(false);
                    }
                    setShow(false);
                }}></div>
            )}
            <animated.div className={className.content} style={menuLeftStyle}>
                <div
                    className={className.iconClose}
                    onClick={() => {
                        startHideMenuLeft();
                        setShow(false);
                    }}>
                    <FontAwesomeIcon
                        icon={faCircleXmark} />
                </div>
                <div className={className.item}>NEW IN</div>
                <div className={className.shop}>
                    <div
                        className={className.title}
                        onClick={() => goTo("/collection/all-1")}>SHOP</div>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        size={"1x"}
                        className={className.iconDown}
                        onClick={() => {
                            if (showShop) {
                                setShowTop(false);
                            }
                            setShowShop(!showShop);
                        }} />
                </div>
                <animated.div className={className.shopWrapper} style={shopStyle}>
                    <div
                        className={className.item1}
                        onClick={() => goTo("/collection/all-1")}>ALL</div>
                    <div className={className.tops}>
                        <div className={className.title}>TOPS</div>
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            size={"1x"}
                            className={className.iconDown}
                            onClick={() => {
                                setShowTop(!showTop);
                            }} />
                    </div>
                    <animated.div className={className.topWrapper} style={topStyle}>
                        <div className={className.item1}>CAMISOLES</div>
                        <div className={className.item1}>T-SHIRTS</div>
                        <div className={className.item1}>SHIRTS & BLOUSES</div>
                    </animated.div>
                    <div
                        className={className.item1}
                        onClick={() => goTo("/collection/trousers-4")}>TROUSERS</div>
                    <div
                        className={className.item1}
                        onClick={() => goTo("/collection/skirts-shorts-6")}>SKIRTS & SHORTS</div>
                    <div
                        className={className.item1}
                        onClick={() => goTo("/collection/dresses-jumpsuits-5")}>DRESSES & JUMPSUITS</div>
                    <div className={className.item1}>OUTER-WEAR</div>
                    <div className={className.item1}>SWIMWEAR</div>
                    <div
                        className={className.item1}
                        onClick={() => goTo("/collection/accessories-3")}>ACCESSORIES</div>
                </animated.div>
                <div className={className.item}>SALE</div>
                <div className={className.item}>LIBÉ AT WORK</div>
                <div className={className.item}>DENIM WEAR</div>
                <div
                    className={className.item}
                    onClick={() => goTo("/collection/libe-good-2")}>LIBÉ GOODS</div>
                <div className={className.item}>#WOMENSPEAK</div>
            </animated.div>
        </div>
    )
}

export default MenuLeft
export { menuLeftRef }