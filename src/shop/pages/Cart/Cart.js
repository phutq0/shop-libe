import { useState } from "react";
import className from "./className";
import { product1, product2, product3 } from "../../components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

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

const Cart = () => {

    const [data, setData] = useState([...data_]);

    return (
        <div className={className.container}>
            <div className={className.title}>
                YOUR SHOPPING CART
            </div>
            <div className={className.description}>
                {`${data.length} item(s) in your cart`}
            </div>
            <div className={className.content}>
                {data.map((item, index) => (
                    <div
                        key={item.id ?? index}
                        className={className.item}>
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
                            <div className={className.price}>{item.price.toLocaleString()}₫</div>
                        </div>
                        <div className={className.sumPrice}>
                            {(item.number * item.price).toLocaleString()}₫
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
            <div className={className.total}>
                <div>TOTAL</div>
                <div>{data.reduce((prev, item) => prev + item.number * item.price, 0).toLocaleString()}₫</div>
            </div>
            <div className={className.bottom}>
                <div className={className.button}>
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