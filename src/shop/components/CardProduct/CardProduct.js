import { useState } from "react"
import className from "./className"
import { useNavigate } from "react-router-dom";
import Utils from "shop/share/Utils";


const CardProduct = ({ item }) => {

    const navigate = useNavigate();

    const [focus, setFocus] = useState(false);
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
            onClick={() => {
                const path = Utils.convertToPath(item.name, item.productId);
                navigate(`/product/${path}`)
            }}>

            <div className={className.content}>
                <div
                    className="relative"
                    onMouseOver={() => setFocus(true)}
                    onMouseOut={() => setFocus(false)}>
                    <img
                        src={"http://localhost:4000" + (item.images[0] ?? "")}
                        className={className.image}
                        alt={item.name} />
                    <img
                        className="absolute top-0 left-0 right-0 w-full rounded-sm border border-gray-300"
                        style={{ opacity: focus ? 1 : 0 }}
                        src={"http://localhost:4000" + (item.images[1] ?? "")}
                        alt={item.name} />
                </div>
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