import { faCircleXmark, faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "api2";
import _ from "lodash";
import { createRef, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import DropDown from "shop/components/DropDown/DropDown";
import Utils from "shop/share/Utils";
import { thunkGetCollection } from "shop/share/slices/Collection";

const modalCollectionRef = createRef();
const modalProductRef = createRef();

const Modal = () => {

    return (
        <>
            <CollectionModal />
            <ProductModal />
        </>
    )
}

const CollectionModal = () => {

    const [show, setShow] = useState(false);
    const defaultConfig = {
        title: "Collection",
        buttonLeft: "Cancel",
        buttonRight: "Create",
        type: "CREATE",
        onConfirm: () => 1,
        onCancel: () => 1,
    }

    const [config, setConfig] = useState({ ...defaultConfig });
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [listProduct, setListProduct] = useState([]);
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const productIds = listProduct.map(item => item.productId);

    const loadProduct = () => {
        const result = Api.product.getListProduct({
            page: 0,
            limit: 99,
            query: query
        });
        console.log(result);
        setProducts(result.products);
    }

    useEffect(() => {
        loadProduct();
    }, [query])

    useEffect(() => {
        modalCollectionRef.current = {
            show: (config) => {
                setConfig({ ...defaultConfig, ...config })
                setShow(true);
            },
            hide: () => {
                setShow(false);
            }
        }
    }, []);

    const [color, setColor] = useState("#00ffff");

    const onClickRight = () => {
        if (!name) {
            return;
        }
        const params = {
            name,
            description,
            color,
            collectionId: config?.collection?.collectionId
        }
        if (config.type == "UPDATE") {
            params.listProduct = listProduct;
            params.collectionId = config?.collection?.collectionId
        }
        config.onConfirm(params);
    }

    useEffect(() => {
        if (show) {
            if (config.type == "UPDATE") {
                setName(config.collection.name ?? "");
                setDescription(config.collection.description ?? "");
                setColor(config.collection.color ?? "#00ffff");
                setListProduct(config.collection.products);
                setQuery("");
            }
            else {
                setName("");
                setDescription("");
                setColor("#00ffff");
                setListProduct([]);
                setQuery("");
            }
        }
        loadProduct();
    }, [show]);

    return (
        <div>
            {show &&
                <>
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30"></div>
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div className="absolute top-0 left-0 right-0 bottom-0"></div>
                        <div className="w-full h-full bg-white border rounded shadow flex flex-col md:max-w-4xl z-[1]">
                            <div className="text-center font-semibold py-2 border-b">{config.title}</div>
                            <div className="flex-1 px-3 py-2 overflow-y-scroll">
                                <div className="flex flex-row text-sm items-center mb-3">
                                    <div className="font-semibold min-w-[100px]">Name:</div>
                                    <div className="flex-1 flex h-10">
                                        <input
                                            className="flex-1 outline-none border rounded bg-gray-100 focus-within:border-gray-300 focus-within:bg-white px-2"
                                            placeholder="Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm mb-3">
                                    <div className="font-semibold min-w-[100px]">Description:</div>
                                    <textarea
                                        className="flex-1 h-60 border bg-gray-100 rounded p-2 focus-within:border-gray-300 focus-within:bg-white resize-none outline-none"
                                        placeholder="Description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)} />
                                </div>
                                <div className="flex flex-row text-sm mb-3">
                                    <div className="font-semibold min-w-[100px]">Color:</div>
                                    <div className="flex flex-row flex-1">
                                        <input
                                            type="color"
                                            id="chooseColor"
                                            style={{ width: 0, height: 0 }}
                                            onChange={e => setColor(e.target.value)} />
                                        <label
                                            htmlFor="chooseColor"
                                            className="w-32 h-20 border rounded cursor-pointer"
                                            style={{ backgroundColor: color }}>
                                        </label>
                                    </div>
                                </div>
                                {config.type == "UPDATE" && (
                                    <div className="flex flex-row text-sm mb-3">
                                        <div className="font-semibold min-w-[100px]">Product:</div>
                                        <div className="flex flex-col flex-1 ">
                                            <div className="flex flex-row flex-wrap">
                                                {listProduct.map((item, index) => (
                                                    <div
                                                        key={item.productId ?? index}
                                                        className="w-1/2 h-20 flex flex-row items-center cursor-pointer pb-2 mb-2 border-b pr-2">
                                                        <img
                                                            className="h-20 w-20 object-contain border rounded"
                                                            src={"http://localhost:4000" + item.images[0]}
                                                            alt={item.name} />
                                                        <div className="flex-1 ml-2 pr-2">{item.name}</div>
                                                        <FontAwesomeIcon
                                                            icon={faXmark}
                                                            className="text-xl hover:opacity-50"
                                                            onClick={() => {
                                                                _.remove(listProduct, i => i.productId == item.productId);
                                                                setListProduct([...listProduct]);
                                                            }} />
                                                    </div>
                                                ))}
                                            </div>

                                            <div>
                                                <input
                                                    className="w-[480px] h-9 rounded border outline-none border-gray-200 bg-gray-100 focus-within:border-gray-400 focus-within:bg-white px-2"
                                                    placeholder="Search"
                                                    value={query}
                                                    onChange={e => setQuery(e.target.value)} />
                                                <div className="small-scrollbar flex flex-col mt-1 py-1 w-[480px] h-[420px] overflow-y-scroll border rounded shadow group-[input]:focus-within:flex">
                                                    {products.filter(item => !productIds.includes(item.productId)).map((item, index) => (
                                                        <div
                                                            key={item.productId ?? index}
                                                            className="flex flex-row items-center pl-2 hover:bg-gray-100 py-1 cursor-pointer group border-b">
                                                            <img
                                                                className="h-20 w-20 object-contain border rounded"
                                                                src={"http://localhost:4000" + item.images[0]}
                                                                alt={item.name} />
                                                            <div className="flex-1 py-1 pl-2 line-clamp-1 group-hover:font-semibold">{item.name}</div>
                                                            <FontAwesomeIcon
                                                                icon={faPlus}
                                                                className="px-3 py-2 border rounded hover:bg-black hover:text-white"
                                                                onClick={() => {
                                                                    listProduct.push(item);
                                                                    setListProduct([...listProduct]);
                                                                }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row px-1 py-2 border-t border-gray-300 text-sm font-semibold">
                                <div
                                    className="flex-1 flex items-center justify-center border border-gray-200 rounded bg-red-500 py-2 hover:opacity-70 cursor-pointer text-white"
                                    onClick={() => {
                                        config.onCancel();
                                        setShow(false);
                                    }}>
                                    {config.buttonLeft}
                                </div>
                                <div className="flex-1 flex items-center justify-center border border-gray-200 rounded bg-green-500 py-2 ml-1 hover:opacity-70 cursor-pointer text-white"
                                    onClick={onClickRight}>
                                    {config.buttonRight}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

const ProductModal = () => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const defaultConfig = {
        title: "Product",
        buttonLeft: "Cancel",
        buttonRight: "Create",
        onConfirm: () => 1,
        onCancel: () => 1,
        type: "CREATE"
    }

    const [config, setConfig] = useState({ ...defaultConfig });

    useEffect(() => {
        modalProductRef.current = {
            show: (config) => {
                setConfig({
                    ...defaultConfig,
                    ...config
                });
                setShow(true);
            },
            hide: () => {
                setConfig({ ...defaultConfig });
                setShow(false)
            }
        }
    }, []);

    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [removeImages, setRemoveImages] = useState([])

    const onAddImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = "multiple"
        input.onchange = e => {
            const arr = e.target.files;
            const tmp = []
            for (const i of arr) {
                tmp.push(i);
            }
            const files = tmp.map(i => ({
                id: Math.random().toString(),
                file: i,
                link: URL.createObjectURL(i)
            }));
            e.target.files = null;
            setImages([...images, ...files]);
        }
        input.click();
        input.remove();
    }

    const onClickRight = () => {
        const params = {
            name: name,
            price: Number(price),
            variantList: variantList,
            options: options,
            images: images,
            description: description
        }
        if (config.type == "UPDATE") {
            params.removeImages = removeImages;
            params.productId = config.product.productId;
        }
        config.onConfirm(params);
    }

    const [variants, setVariants] = useState([]);
    const [variantList, setVariantList] = useState([]);

    const loadVariant = () => {
        const result = Api.product.getListVariant();
        setVariants(JSON.parse(JSON.stringify(result.variants)))
    }

    useEffect(() => {
        loadVariant()
    }, []);

    const existedVariant = variantList.map(i => i.name);

    const [options, setOptions] = useState({
        columns: "",
        data: []
    });

    const getOption = () => {
        const result = {
            columns: [],
            data: []
        };
        const obj = {};
        for (const i of variants) {
            obj[i.name.toLowerCase()] = i.variantId
        }
        const _variantList = Utils.parse(variantList.map(item => ({ ...item, index: obj[item.name.toLowerCase()] })));
        _variantList.sort((a, b) => a.index - b.index)
        for (const i of _variantList) {
            result.columns.push(i.name);
        }
        result.columns.push("Number");
        result.columns.push("Sold");
        result.columns.push("Remain");
        result.columns = result.columns.join("|");
        const tempData = [];
        for (const item of _variantList) {
            if (tempData.length === 0) {
                for (const value of item.data) {
                    tempData.push([value.value]);
                }
            } else {
                const newData = [];
                for (const newItem of tempData) {
                    for (const value of item.data) {
                        newData.push([...newItem, value.value]);
                    }
                }
                tempData.length = 0;
                tempData.push(...newData);
            }
        }
        result.data = tempData;
        result.data = result.data.map(item => ({
            name: item.join("|"),
            id: Math.random().toString(),
            number: 1,
            sold: 0,
            remain: 1
        }));
        for (const i of result.data) {
            for (const j of options.data) {
                if (i.name == j.name) {
                    i.modelId = j.modelId;
                    i.number = j.number;
                    i.sold = j.sold;
                    i.remain = j.remain;
                }
            }
        }
        return result;
    }

    useEffect(() => {
        const result = getOption();
        setOptions(result);
    }, [variantList]);

    useEffect(() => {
        if (show) {
            if (config.type == "UPDATE") {
                const product = config.product;
                const variants = product.variants.map(item => ({
                    ...item,
                    id: Math.random().toString(),
                    data: item.data.map(item => ({
                        id: Math.random().toString(),
                        value: item
                    }))
                }));
                setName(product.name);
                setPrice(product.price);
                setVariantList(variants);
                setImages(product.images.map(item => ({
                    id: Math.random().toString(),
                    link: "http://localhost:4000" + item
                })));
                setDescription(product.description)
            }
            else {
                setName("");
                setPrice(0);
                setVariantList([]);
                setImages([]);
                setDescription("")
            }
        }
        setRemoveImages([]);
    }, [show]);

    useLayoutEffect(() => {
        if (show) {
            const product = config.product;
            if (config.type == "UPDATE") {
                setOptions({
                    columns: product.models.columns,
                    data: product.models.data
                });
            }
            else {
                setOptions({
                    columns: "",
                    data: []
                });
            }
        }
    }, [show]);


    return (
        <div>
            {show &&
                <>
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30"></div>
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div className="absolute top-0 left-0 right-0 bottom-0"></div>
                        <div className="w-full h-full bg-white border rounded shadow flex flex-col md:max-w-4xl z-[1]">
                            <div className="text-center font-semibold py-2 border-b">{config.title}</div>
                            <div className="flex-1 px-3 py-2 overflow-y-scroll">
                                <div className="flex flex-row text-sm items-center mb-3">
                                    <div className="font-semibold min-w-[100px]">Name:</div>
                                    <div className="flex-1 flex h-10">
                                        <input
                                            className="flex-1 outline-none border rounded bg-gray-100 focus-within:border-gray-300 focus-within:bg-white px-2"
                                            placeholder="Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm items-center mb-3">
                                    <div className="font-semibold min-w-[100px]">Price:</div>
                                    <div className="flex-1 flex h-10">
                                        <input
                                            className="flex-1 outline-none border rounded bg-gray-100 focus-within:border-gray-300 focus-within:bg-white px-2"
                                            placeholder="Price"
                                            value={price}
                                            type="number"
                                            onChange={e => setPrice(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm mb-3">
                                    <div className="font-semibold min-w-[100px]">Variant:</div>
                                    <div className="flex-1 flex flex-col">
                                        <DropDown
                                            className="w-fit"
                                            component={
                                                <div className="font-semibold text-sm px-3 py-1 border rounded border-gray-200 cursor-pointer hover:bg-black hover:text-white">
                                                    + ADD
                                                </div>
                                            }
                                            render={
                                                <div className="w-20 flex flex-col bg-white border rounded shadow-md py-1">
                                                    {variants.filter(i => !existedVariant.includes(i.name)).map((item, index) => (
                                                        <div
                                                            key={item.variantId ?? index}
                                                            className="hover:bg-gray-200 px-2 cursor-pointer py-1 hover:font-semibold text-sm"
                                                            onClick={() => {
                                                                variantList.push({
                                                                    ...item,
                                                                    id: Math.random().toString(),
                                                                    data: [{
                                                                        id: Math.random().toString(),
                                                                        value: ""
                                                                    }]
                                                                });
                                                                setVariantList([...variantList]);
                                                            }}>
                                                            {item.name}
                                                        </div>

                                                    ))}
                                                </div>
                                            } />
                                        {variantList.map((variant, index) => (
                                            <div
                                                key={variant.id ?? index}
                                                className="flex flex-row mt-3 relative">
                                                <div className="font-semibold h-10 w-16">
                                                    {variant.name}:
                                                </div>
                                                <div className="flex-1 flex flex-row ml-2 flex-wrap pr-6">
                                                    {variant.data.map((item_, index) => (
                                                        <div
                                                            key={index}
                                                            className="h-8 w-20 flex mr-2 mb-2 relative">
                                                            <input
                                                                value={item_.value}
                                                                autoFocus
                                                                className="overflow-hidden outline-none border-[2px] rounded border-gray-300 focus-within:bg-white focus-within:border-gray-600 text-sm text-center font-semibold w-fit"
                                                                onChange={e => {
                                                                    item_.value = e.target.value;
                                                                    setVariantList(Utils.parse(variantList));
                                                                }}
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faCircleXmark}
                                                                className="absolute -top-[6px] -right-[6px] cursor-pointer text-sm hover:opacity-70 text-gray-600 bg-white border rounded-full"
                                                                onClick={() => {
                                                                    _.remove(variant.data, i => i.id == item_.id);
                                                                    if (variant.data.length == 0) {
                                                                        _.remove(variantList, i => i.id == variant.id);
                                                                    }
                                                                    setVariantList(Utils.parse(variantList));
                                                                }} />
                                                        </div>
                                                    ))}
                                                    <div
                                                        className="font-semibold text-sm px-2 py-1 border rounded border-gray-200 cursor-pointer hover:bg-black hover:text-white w-fit h-fit"
                                                        onClick={() => {
                                                            variant.data.push({
                                                                id: Math.random().toString(),
                                                                value: ""
                                                            });
                                                            setVariantList(Utils.parse(variantList));
                                                        }}>
                                                        + ADD
                                                    </div>
                                                </div>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className="cursor-pointer text-xl text-gray-600 bg-white mr-2 z-[1]"
                                                    onClick={() => {
                                                        _.remove(variantList, i => i.id == variant.id);
                                                        setVariantList(Utils.parse(variantList));
                                                    }} />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                {options.data.length > 0 && (
                                    <div className="flex flex-row text-sm mb-3">
                                        <div className="font-semibold min-w-[100px]">Options:</div>
                                        <div className="flex flex-col border p-1 w-fit rounded shadow">
                                            <div className="flex flex-row">
                                                {options.columns?.split("|").map((column, index) => (
                                                    <div key={index} className="w-28 h-8 text-center flex items-center justify-center font-semibold border-b">{column}</div>
                                                ))}
                                                <div className="flex-1 px-3 h-8 text-center flex items-center justify-center font-semibold border-b">Action</div>
                                            </div>
                                            {options.data.map((item, index) => (
                                                <div
                                                    className={"flex flex-row border-b" + (index % 2 == 1 ? " bg-gray-100" : "")}
                                                    key={index}>
                                                    {item.name.split("|").map((column, index_) => (
                                                        <div
                                                            key={index_}
                                                            className="w-28 h-8 text-center flex items-center justify-center">
                                                            {column}
                                                        </div>
                                                    ))}
                                                    <div className="w-28 h-8 flex justify-center font-semibold">
                                                        <input
                                                            className="w-24 h-8 text-center outline-none bg-transparent focus-within:border-2 focus-within:border-gray-500 rounded"
                                                            value={item.number}
                                                            type="number"
                                                            onChange={e => {
                                                                item.number = Number(e.target.value);
                                                                setOptions(Utils.parse(options));
                                                            }} />
                                                    </div>
                                                    <div className="w-28 h-8 flex justify-center font-semibold">
                                                        <input
                                                            className="w-24 h-8 text-center outline-none bg-transparent focus-within:border-2 focus-within:border-gray-500 rounded"
                                                            value={item.sold}
                                                            type="number"
                                                            onChange={e => {
                                                                item.sold = Number(e.target.value);
                                                                setOptions(Utils.parse(options));
                                                            }} />
                                                    </div>
                                                    <div className="w-28 h-8 flex justify-center font-semibold">
                                                        <input
                                                            className="w-24 h-8 text-center outline-none bg-transparent focus-within:border-2 focus-within:border-gray-500 rounded"
                                                            value={item.remain}
                                                            type="number"
                                                            onChange={e => {
                                                                item.remain = Number(e.target.value);
                                                                setOptions(Utils.parse(options));
                                                            }} />
                                                    </div>
                                                    <div className="flex-1 px-3 h-8 text-center flex items-center justify-center font-semibold border-b">
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                            className="text-red-500 cursor-pointer hover:opacity-70"
                                                            onClick={() => {
                                                                _.remove(options.data, i => i == item);
                                                                setOptions(Utils.parse(options));
                                                            }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-row text-sm mb-3">
                                    <div className="font-semibold min-w-[100px]">Image:</div>
                                    <div className="flex flex-row flex-1 flex-wrap">
                                        {images.map(item => (
                                            <div
                                                key={item.id}
                                                className="flex w-[100px] h-[100px] mr-2 mb-3 cursor-pointer relative"
                                            >
                                                <img
                                                    src={item.link}
                                                    className="flex-1 object-contain border border-gray-300 rounded"
                                                    onClick={() => {
                                                        const a = document.createElement("a");
                                                        a.target = "__blank";
                                                        a.href = item.link;
                                                        a.click();
                                                        a.remove();
                                                    }} />
                                                <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    className="absolute -top-[6px] -right-[6px] cursor-pointer text-sm hover:opacity-70 text-gray-600 bg-white border rounded-full"
                                                    onClick={() => {
                                                        if (!item.file) {
                                                            removeImages.push(item.link);
                                                        }
                                                        _.remove(images, i => i.id == item.id);
                                                        setImages(Utils.parse(images));
                                                    }} />

                                            </div>
                                        ))}
                                        <div
                                            className="px-2 flex items-center justify-center font-semibold text-sm border border-gray-300 rounded hover:bg-black hover:text-white cursor-pointer h-8"
                                            onClick={onAddImage}>
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="mr-1" />
                                            ADD
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm mb-3">
                                    <div className="font-semibold min-w-[100px]">Description:</div>
                                    <textarea
                                        className="flex-1 h-60 border bg-gray-100 rounded p-2 focus-within:border-gray-300 focus-within:bg-white resize-none outline-none"
                                        placeholder="Description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-row px-1 py-2 border-t border-gray-300 text-sm font-semibold">
                                <div
                                    className="flex-1 flex items-center justify-center border border-gray-200 rounded bg-red-500 py-2 hover:opacity-70 cursor-pointer text-white"
                                    onClick={() => {
                                        config.onCancel();
                                        setShow(false);
                                    }}>
                                    {config.buttonLeft}
                                </div>
                                <div className="flex-1 flex items-center justify-center border border-gray-200 rounded bg-green-500 py-2 ml-1 hover:opacity-70 cursor-pointer text-white"
                                    onClick={onClickRight}>
                                    {config.buttonRight}
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            }

        </div>
    )
}

export default Modal
export { modalProductRef, modalCollectionRef }