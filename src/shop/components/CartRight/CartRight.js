import { createRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";

import className from "./className";
import { product1, product2, product3 } from "../Image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListProductDetail, thunkGetCart } from "shop/share/slices/Cart";
import Utils from "shop/share/Utils";
import Api from "api2";

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
    const dispatch = useDispatch();

    const { listModel } = useSelector(state => state.cart);
    const { account } = useSelector(state => state.account)

    const [show, setShow] = useState(false);
    const [cartRightStyle, springCartRight] = useSpring(() => ({
        transform: "translateX(100%)"
    }));

    const loadData = () => {
        dispatch(thunkGetCart(account?.accountId ?? 0))
    }

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
            document.body.style.paddingRight = "8px";
        }
        else {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        }
    }, [show]);

    useEffect(() => {
        cartRightRef.current = {
            show: () => {
                startShowCartRight();
                setShow(true);
            }
        }
        loadData()
    }, []);

    const goTo = (item) => {
        const path = Utils.convertToPath(item.model.product.name, item.model.productId);
        startHideCartRight();
        setShow(false);
        navigate("/product/" + path);
    }

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
                {listModel.length == 0 && (
                    <div className={className.notFound}>
                        Không có sản phẩm nào...
                    </div>
                )}
                <div className={className.data}>
                    {listModel.map((item, index) => (
                        <div
                            key={item.id ?? index}
                            className={className.item}>
                            <img
                                className={className.image}
                                src={"http://localhost:4000" + item.model.product.images[0]}
                                onClick={() => goTo(item)} />
                            <div className={className.infor}>
                                <div
                                    className={className.name}
                                    onClick={() => goTo(item)}>{item.model.product.name}</div>
                                <div className={className.att}>
                                    {item.model.name.replace(/\|/g, " / ")}
                                </div>
                                <div className={className.number}>
                                    <div
                                        className={className.buttonAdd}
                                        onClick={() => {
                                            const response = Api.cart.popFromCart(item.model.modelId, account.accountId, 1);
                                            Utils.showToastSuccess('Remove successfully!')
                                            loadData();
                                        }}>
                                        -
                                    </div>
                                    <div className={className.count}>
                                        {item.number ?? 1}
                                    </div>
                                    <div
                                        className={className.buttonAdd}
                                        onClick={() => {
                                            const response = Api.cart.addToCart(item.model.modelId, account.accountId, 1);
                                            if (response.result == "success") {
                                                Utils.showToastSuccess("Add to cart successfully!");
                                                loadData();
                                            }
                                            else {
                                                Utils.showToastError(response.message);
                                            }
                                        }}>
                                        +
                                    </div>
                                </div>
                                <div className={className.price}>{item.model.product.price.toLocaleString()}₫</div>
                            </div>
                            <div
                                className={className.clear}
                                onClick={async () => {
                                    const response = Api.cart.popFromCart(item.model.modelId, account.accountId, item.number);
                                    Utils.showToastSuccess('Remove successfully!')
                                    loadData();
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
                        <div>{listModel.reduce((prev, item) => prev + item.model.product.price * item.number, 0).toLocaleString()}₫</div>
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
                        <div
                            className={className.button}
                            onClick={() => {
                                startHideCartRight();
                                setShow(false);
                                navigate("/checkout")
                            }}>
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