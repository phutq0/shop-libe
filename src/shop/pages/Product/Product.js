import { useState } from "react";
import { product1, product2, product3, product4, product5, product6 } from "../../components/Image";
import className from "./className";

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

const Product = () => {

    const [product, setProduct] = useState(product_);
    const [number, setNumber] = useState(1);

    return (
        <div className={className.container}>
            <div className={className.path}>
                <div className={className.collection}>Tops</div>
                /
                <div className={className.product}>Yellow U-neck Tank Top</div>
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
                            {product.colors.map((item, index) => (
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
                            {product.materials.map((item, index) => (
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
                            {product.sizes.map((item, index) => (
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
                        <div className={className.buttonAdd}>
                            ADD TO BAG
                        </div>
                        <div className={className.buttonAdd}>
                            FIND YOUR SIZE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product