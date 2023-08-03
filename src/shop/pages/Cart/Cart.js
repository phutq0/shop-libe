import { useEffect, useState } from "react";
import className from "./className";
import { product1, product2, product3 } from "../../components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "shop/share/slices/Cart";
import Utils from "shop/share/Utils";
import { useNavigate } from "react-router-dom";
import Api from "api2";

const Cart = () => {

    const navigate = useNavigate();
    const { account } = useSelector(state => state.account);

    const dispatch = useDispatch();

    const { listModel } = useSelector(state => state.cart);

    const loadData = () => {
        dispatch(thunkGetCart(account.accountId))
    }

    useEffect(() => {
        if (listModel.length == 0) {
            loadData();
        }
    }, [])

    return (
        <div className={className.container}>
            <div className={className.title}>
                YOUR SHOPPING CART
            </div>
            <div className={className.description}>
                {`${listModel.length} item(s) in your cart`}
            </div>
            <div className={className.content}>
                {listModel.map((item, index) => (
                    <div
                        key={item.id ?? index}
                        className={className.item}>
                        <img
                            className={className.image}
                            src={"http://localhost:4000" + item.model.product.images[0]} />
                        <div className={className.infor}>
                            <div className={className.name}>{item.model.product.name}</div>
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
                        <div className={className.sumPrice}>
                            {(item.model.product.price * item.number).toLocaleString()}₫
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
            <div className={className.total}>
                <div>TOTAL</div>
                <div>{listModel.reduce((prev, item) => prev + item.model.product.price, 0).toLocaleString()}₫</div>
            </div>
            <div className={className.bottom}>
                <div
                    className={className.button}
                    onClick={() => navigate("/")}>
                    CONTINUE SHOPPING
                </div>
                <div className={className.button}>
                    CHECKOUT
                </div>
            </div>
        </div>
    );
}

export default Cart