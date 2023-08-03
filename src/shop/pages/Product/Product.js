import { useEffect, useState } from "react";
import { product1, product2, product3, product4, product5, product6 } from "../../components/Image";
import className from "./className";
import { useParams } from "react-router-dom";
import Utils from "shop/share/Utils";
import { useDispatch } from "react-redux";
import { thunkGetCart } from "shop/share/slices/Cart";
import Api from "api2";
import { useMemo } from "react";
import { useLayoutEffect } from "react";

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

    const [product, setProduct] = useState({
        id: 0,
        name: "",
        price: 0,
        description: "",
        colors: [],
        materials: [],
        sizes: [],
        capacities: [],
        images: []
    });
    const [number, setNumber] = useState(1);
    const [color, _] = useState({});

    const { product: path } = useParams();
    const [productId, setProductId] = useState(() => {
        const tmp = path?.split("-") ?? [];
        try {
            const x = Number(tmp.at(-1));
            return x;
        } catch (error) {
            return 1;
        }
    });

    const loadData = async () => {
        const result = Api.product.getProduct(productId);
        const product = {
            ...result.product,
            materials: getRender(result.product, "Material"),
            colors: getRender(result.product, "Color", true),
            sizes: getRender(result.product, "Size"),
            capacities: getRender(result.product, "Capacity"),
        }
        console.log(product);
        setProduct(product);
    }

    const remain = (() => {
        const selectedColors = product.colors.filter(i => i.selected == true);
        const selectedMaterial = product.materials.filter(i => i.selected == true);
        const selectedSize = product.sizes.filter(i => i.selected == true);
        const selectedCapacity = product.capacities.filter(i => i.selected == true);
        const selected = [];
        const miss = []
        "Color|Size|Material|Number|Sold|Remain"
        if (product.colors.length > 0) {
            if (selectedColors.length > 0) selected.push(selectedColors[0].name)
            else miss.push("Color")
        }
        if (product.sizes.length > 0) {
            if (selectedSize.length > 0) selected.push(selectedSize[0].name)
            else miss.push("Size")
        }
        if (product.materials.length > 0) {
            if (selectedMaterial.length > 0) selected.push(selectedMaterial[0].name)
            else miss.push("Material")
        }
        if (product.capacities.length > 0) {
            if (selectedCapacity.length > 0) selected.push(selectedCapacity[0].name)
            else miss.push("Capacity")
        }
        const name = selected.join("|");
        const tmp = product?.models?.data?.filter(i => i.name == name);
        console.log(tmp);
        if (tmp && tmp.length > 0) {
            if (number > tmp[0].remain) {
                setNumber(tmp[0].remain);
            }
            return {
                value: tmp[0].remain,
                miss: miss
            }
        }
        return {
            value: null,
            miss: miss
        }
    })();

    const handleAddToCart = async () => {
        if (remain.miss.length > 0) {
            Utils.showToastWarn("Please select " + remain.miss.join(", ") + "!");
            return;
        }
    }

    const getRender = (product, name, isColor = false) => {
        if (!product.models) {
            return []
        }
        const column = product?.models?.columns ?? "";
        if (!column) {
            return []
        }
        if (column.includes(name)) {
            const index = column.split("|").findIndex(i => i == name);
            const arr = product?.models.data.map(item => item.name.split("|")[index])
            const set = new Set(arr);
            const result = [];
            for (const i of set) {
                result.push({
                    name: i,
                    selected: false,
                    hex: isColor ? color[i] : undefined
                })
            }
            if (result.length == 1) {
                result[0].selected = true;
            }
            return result;
        }
        return [];
    }

    useEffect(() => {
        const tmp = path?.split("-") ?? [];
        try {
            const x = Number(tmp.at(-1));
            setProductId(x);
        } catch (error) {
            setProductId(1);
        }
    }, [path]);

    useEffect(() => {
        loadData();
    }, [productId]);

    useLayoutEffect(() => {
        const result = Api.product.getListColor();
        for (const i of result.colors) {
            color[i.name] = i.hex;
        }
    }, []);


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
                            src={"http://localhost:4000" + item} />
                    ))}
                </div>
                <div className={className.right}>
                    <div className={className.info}>
                        <div className={className.name}>
                            {product.name}
                        </div>
                        <div className={className.price}>
                            {product.price.toLocaleString()}₫
                        </div>
                        {product.colors.length > 0 && (
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
                                                style={{ backgroundColor: item.hex }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {product.materials.length > 0 && (
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
                        )}
                        {product.sizes.length > 0 && (
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
                        )}
                        {remain.value && (
                            <div className="mt-2 text-sm font-semibold">Remain: {remain.value} product(s)</div>
                        )}
                        <div className={className.number}>
                            <div
                                className={className.numberButton}
                                onClick={() => {
                                    const x = Math.max(number - 1, 1);
                                    setNumber(x);
                                }}>
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
                                onClick={() => {
                                    if (remain) {
                                        const x = Math.min(number + 1, remain.value)
                                        setNumber(x)
                                    }
                                    else {
                                        setNumber(i => i + 1)
                                    }
                                }}>
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
                        {product.description && (
                            <>
                                <div className="mt-4 mb-2 text-base font-semibold outline-none">Detail Information:</div>
                                <div className="flex flex-col">
                                    {product.description.split("\n").map((item, index) => (
                                        item ?
                                            <div
                                                key={index}
                                                className="text-sm">
                                                {item}
                                            </div>
                                            :
                                            <div className="h-3"></div>
                                    ))}
                                </div>
                                {/* <textarea
                                    className="mt-2 md:min-h-[800px] text-sm outline-none"
                                    value={product.description}
                                    readOnly /> */}
                            </>
                        )}
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