import { createRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";

import className from "./className";
import { product1, product2, product3 } from "../Image";
import { useNavigate } from "react-router-dom";

const cartRightRef = createRef();

const data_ = [
    {
        id: 1,
        name: "BLACK SIDE ZIP SHORTS",
        size: "L",
        color: "Black",
        material: "Cotton",
        number: 1,
        price: 380000,
        image: product1,
    },
    {
        id: 2,
        name: "FULL OF LOVE WHITE T-SHIRT",
        size: "L",
        color: "Black",
        material: "Cotton",
        number: 1,
        price: 390000,
        image: product2,
    },
    {
        id: 3,
        name: "LIBÉ NAVY CAP",
        size: "L",
        color: "Black",
        material: "Cotton",
        number: 2,
        price: 380000,
        image: product3,
    },
    {
        id: 4,
        name: "FULL OF LOVE WHITE T-SHIRT",
        size: "L",
        color: "Black",
        material: "Cotton",
        number: 1,
        price: 390000,
        image: product2,
    },
    {
        id: 5,
        name: "LIBÉ NAVY CAP",
        size: "L",
        color: "Black",
        material: "Cotton",
        number: 2,
        price: 380000,
        image: product3,
    },
    {
        id: 6,
        name: "FULL OF LOVE WHITE T-SHIRT",
        size: "L",
        color: "Black",
        material: "Cotton",
        number: 1,
        price: 390000,
        image: product2,
    },
    {
        id: 7,
        name: "LIBÉ NAVY CAP",
        size: "L",
        color: "Black",
        material: "Cotton",
        number: 2,
        price: 380000,
        image: product3,
    },
]

const CartRight = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [data, setData] = useState([...data_])
    const [cartRightStyle, springCartRight] = useSpring(() => ({
        transform: "translateX(100%)"
    }));

    const startShowCartRight = () => {
        springCartRight.start({
            transform: "translateX(0%)",
            config: {
                duration: 250,
            }
        });
    }

    const startHideCartRight = () => {
        springCartRight.start({
            transform: "translateX(100%)",
            config: {
                duration: 250,
            }
        });
    }

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
    }, [show]);

    useEffect(() => {
        cartRightRef.current = {
            show: () => {
                startShowCartRight();
                setShow(true);
            }
        }
    }, []);

    return (
        <div>
            {show && (
                <div
                    className={className.overlay}
                    onClick={() => {
                        startHideCartRight();
                        setShow(false);
                    }}></div>
            )}
            <animated.div className={className.content} style={cartRightStyle}>
                <div
                    className={className.iconClose}
                    onClick={() => {
                        startHideCartRight();
                        setShow(false);
                    }}>
                    <FontAwesomeIcon
                        icon={faCircleXmark} />
                </div>
                <div className={className.title}>CART</div>
                {/* <div className={className.notFound}>
                        Không có sản phẩm nào...
                    </div> */}

                <div className={className.data}>
                    {data.map((item, index) => (
                        <div
                            key={item.id ?? index}
                            className={className.item}
                        >
                            <img
                                className={className.image}
                                src={item.image} />
                            <div className={className.infor}>
                                <div className={className.name}>{item.name}</div>
                                <div className={className.att}>
                                    {item.color} / {item.material} / {item.size}
                                </div>
                                <div className={className.number}>
                                    <div
                                        className={className.buttonAdd}
                                        onClick={() => {
                                            item.number = item.number - 1;
                                            setData([...data])
                                        }}>
                                        -
                                    </div>
                                    <div className={className.count}>
                                        {item.number}
                                    </div>
                                    <div
                                        className={className.buttonAdd}
                                        onClick={() => {
                                            item.number = item.number + 1;
                                            setData([...data])
                                        }}>
                                        +
                                    </div>
                                </div>
                                <div className={className.price}>{item.price}₫</div>
                            </div>
                            <div
                                className={className.clear}
                                onClick={() => {

                                }}>
                                <FontAwesomeIcon
                                    icon={faCircleXmark} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={className.bottom}>
                    <div className={className.total}>
                        <div>TOTAL</div>
                        <div>2,800,000₫</div>
                    </div>
                    <div className={className.row}>
                        <div
                            className={className.button}
                            onClick={() => {
                                startHideCartRight();
                                setShow(false);
                                navigate("/cart")
                            }}>
                            SEE YOUR BAG
                        </div>
                        <div className={className.button}>
                            CHECKOUT
                        </div>
                    </div>
                </div>
            </animated.div>
        </div>
    )
}

export default CartRight
export { cartRightRef }