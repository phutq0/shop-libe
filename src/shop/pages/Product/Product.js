import { useEffect, useState } from "react";
import { product1, product2, product3, product4, product5, product6 } from "../../components/Image";
import className from "./className";
import { useParams } from "react-router-dom";
import Api from "shop/api";
import Utils from "shop/share/Utils";
import { useDispatch } from "react-redux";
import { thunkGetCart } from "shop/share/slices/Cart";

const product_ = {
    id: 1,
    name: "Navy Wide Leg Trousers",
    price: 490000,
    images: [
        product1,
        product2,
        product3,
        product4,
        product5,
        product6
    ],
    colors: [
        { name: "Navy", hex: "192841", selected: false },
        { name: "Blue", hex: "1167b1", selected: false },
        { name: "Yellow", hex: "fee12b", selected: false },
    ],
    materials: [
        { name: "Cotton", selected: false },
        { name: "Nhựa ABS", selected: false },
    ],
    sizes: [
        { name: "S", selected: false },
        { name: "M", selected: false },
        { name: "XL", selected: false },
    ]
}

const color_ = {
    "black": "000000",
    "white": "ffffff",
    "blue": "1167b1",
    "green": "4aa02c",
    "yellow": "fee12b",
    "coral": "ff7f4f"
}

const Product = () => {

    const dispatch = useDispatch()

    const [product, setProduct] = useState(product_);
    const [number, setNumber] = useState(1);

    const { product: path } = useParams();
    const [productId, setProductId] = useState(() => {
        return Number(path.split("-").at(-1));
    });

    const loadData = async () => {
        const response = await Api.product.getProductInformation(productId);
        const detail = JSON.parse(response.data.product.detail);
        setProduct({
            ...response.data.product,
            images: response.data.product.imageProduct.map(item => item.imageLink),
            materials: detail.material.split("|").map(item => ({ name: item, selected: false })),
            sizes: detail.size.split("|").map(item => ({ name: item, selected: false })),
            colors: detail.color.split("|").map(item => ({ name: item, selected: false, hex: color_[item.toLowerCase()] })),
            detail: detail
        })
    }

    const handleAddToCart = async () => {
        const response = await Api.cart.addToCart(productId);
        Utils.showToastSuccess("Add successfully!");
        dispatch(thunkGetCart());
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className={className.container}>
            <div className={className.path}>
                <div className={className.collection}>Product</div>
                /
                <div className={className.product}>{product.name}</div>
            </div>
            <div className={className.content}>
                <div className={className.listImage}>
                    {product.images.map((item, index) => (
                        <img
                            key={index}
                            className={className.image}
                            src={item} />
                    ))}
                </div>
                <div className={className.right}>
                    <div className={className.infor}>
                        <div className={className.name}>
                            {product.name}
                        </div>
                        <div className={className.price}>
                            {product.price.toLocaleString()}₫
                        </div>
                        <div className={className.colors}>
                            {product.colors?.map((item, index) => (
                                <div
                                    key={index}
                                    className={className.itemColor}
                                    onClick={() => {
                                        product.colors = product.colors.map((_item, _index) => ({
                                            ..._item,
                                            selected: _index == index ? true : false
                                        }));
                                        setProduct({ ...product });
                                    }}>
                                    <div className={className.colorName}>
                                        {item.name}
                                    </div>
                                    <div className={item.selected ? className.colorSelected : className.color}>
                                        <div
                                            className={className.colorHex}
                                            style={{ backgroundColor: "#" + (item.hex ?? "") }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={className.material}>
                            {product.materials?.map((item, index) => (
                                <div
                                    key={index}
                                    className={item.selected ? className.materialSelected : className.materialItem}
                                    onClick={() => {
                                        product.materials = product.materials.map((_item, _index) => ({
                                            ..._item,
                                            selected: _index == index ? true : false
                                        }));
                                        setProduct({ ...product });
                                    }}>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                        <div className={className.size}>
                            {product.sizes?.map((item, index) => (
                                <div
                                    key={index}
                                    className={item.selected ? className.sizeSelected : className.sizeItem}
                                    onClick={() => {
                                        product.sizes = product.sizes.map((_item, _index) => ({
                                            ..._item,
                                            selected: _index == index ? true : false
                                        }));
                                        setProduct({ ...product });
                                    }}>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                        <div className={className.number}>
                            <div
                                className={className.numberButton}
                                onClick={() => setNumber(i => i - 1)}>
                                {"-"}
                            </div>
                            <input
                                className={className.inputNumber}
                                type={"number"}
                                inputMode={"numeric"}
                                value={number}
                                onChange={e => setNumber(Number(e.target.value))}
                                placeholder={"1"}
                                pattern="[1-99]*" />
                            <div
                                className={className.numberButton}
                                onClick={() => setNumber(i => i + 1)}>
                                {"+"}
                            </div>
                        </div>
                        <div
                            className={className.buttonAdd}
                            onClick={handleAddToCart}>
                            ADD TO BAG
                        </div>
                        <div className={className.buttonAdd}>
                            FIND YOUR SIZE
                        </div>
                        <textarea
                            className="mt-6 h-[1000px] text-sm font-semibold outline-none"
                            value={product.detail?.description}
                            readOnly />
                        {/* <video controls autoPlay>
                            <source
                                src="https://s3-ap-southeast-1.amazonaws.com/httt-s3-bucket/video/f4096e75-644f-4745-a025-55abd8f6a3ce/Sang%20Qi%20x%20Bai%20Fengxi%20%F0%9F%94%A5%20%23zhaolusi%20%23%E8%B5%B5%E9%9C%B2%E6%80%9D%20%23rosyzhao%20%23cdrama.mp4?AWSAccessKeyId=AKIA6P2VZ5JDPO4RLHUC&Expires=1720100273&Signature=Rcp4Xk9kKYQP%2FkO8F4X73wnBEgg%3D"

                                type="video/mp4" />
                        </video> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product