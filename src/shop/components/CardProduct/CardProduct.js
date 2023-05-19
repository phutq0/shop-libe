import { useState } from "react"
import className from "./className"
import { useNavigate } from "react-router-dom";


const CardProduct = ({ item }) => {

    const navigate = useNavigate();

    const [image, setImage] = useState(item.image1);
    const status = (() => {
        if (!item.status) {
            return;
        }
        if (item.status == "NEW-IN") {
            return {
                display: "NEW IN",
                color: " bg-yellow-400"
            }
        }
        if (item.status == "LOW-IN-STOCK") {
            return {
                display: "LOW IN STOCK",
                color: " bg-red-600"
            }
        }
        if (item.status == "SOLD-OUT") {
            return {
                display: "SOLD OUT",
                color: " bg-black text-white"
            }
        }

        return {
            display: "",
            color: ""
        }
    })();

    return (
        <div
            className={className.wrapper}
            onClick={() => navigate("/product")}>
            <div className={className.content}>
                <img
                    src={image}
                    className={className.image}
                    alt={item.name}
                    onMouseOver={() => setImage(item.image2)}
                    onMouseLeave={() => setImage(item.image1)}
                />
                <div className={className.name}>{item.name}</div>
                <div className={className.price}>
                    {item.salePrice && (
                        <div className={className.salePrice}>
                            {item.salePrice?.toLocaleString()}₫
                        </div>
                    )}
                    <div className={className.basePrice + `${item.salePrice && " line-through"}`}>
                        {item.price?.toLocaleString()}₫
                    </div>
                </div>
                {item.status && (
                    <div className={className.status + status.color}>
                        {status.display}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardProduct