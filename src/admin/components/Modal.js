import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { createRef, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Api from "shop/api";
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
        config.onConfirm(params);
    }

    useEffect(() => {
        if (show) {
            if (config.type == "UPDATE") {
                setName(config.collection.name ?? "");
                setDescription(config.collection.description ?? "");
                setColor(config.collection.color ?? "#00ffff");
            }
            else {
                setName("");
                setDescription("");
                setColor("#00ffff");
            }
        }
    }, [show])

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
                                <div className="flex flex-row text-sm items-center m-3">
                                    <div className="font-semibold min-w-[100px]">Name:</div>
                                    <div className="flex-1 flex h-10">
                                        <input
                                            className="flex-1 outline-none border rounded bg-gray-100 focus-within:border-gray-300 focus-within:bg-white px-2"
                                            placeholder="Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm m-3">
                                    <div className="font-semibold min-w-[100px]">Description:</div>
                                    <textarea
                                        className="flex-1 h-60 border bg-gray-100 rounded p-2 focus-within:border-gray-300 focus-within:bg-white resize-none outline-none"
                                        placeholder="Description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)} />
                                </div>
                                <div className="flex flex-row text-sm m-3">
                                    <div className="font-semibold min-w-[100px]">Color:</div>
                                    <div className="flex flex-row flex-1">
                                        <input
                                            type="color"
                                            id="chooseColor"
                                            style={{ width: 0, height: 0 }}
                                            onChange={e => setColor(e.target.value)} />
                                        <label
                                            htmlFor="chooseColor"
                                            className="flex-1 h-40 border rounded"
                                            style={{ backgroundColor: color }}>
                                        </label>
                                    </div>
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
const ProductModal = () => {

    const { listCollection } = useSelector(state => state.collection);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const defaultConfig = {
        title: "Collection",
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

    const [sizes, setSizes] = useState([]);
    const sizeRef = useRef();

    const [materials, setMaterials] = useState([]);
    const materialRef = useRef();

    const [colors, setColors] = useState([]);
    const colorRef = useRef();

    const [collections, setCollections] = useState([
        { id: 1, name: "hello" }
    ]);

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [number, setNumber] = useState(1);

    useEffect(() => {
        if (listCollection.length == 0) {
            dispatch(thunkGetCollection({
                page: 1,
                pageSize: 99
            }))
        }
    }, [])

    useEffect(() => {
        if (show) {
            if (config.type == "UPDATE") {
                console.log(config.product);
                setName(config.product?.name ?? "");
                setPrice(config.product?.price ?? 0);
                setNumber(config.product?.quantity ?? 1);
                const data = JSON.parse(config.product?.detail ?? "{}");
                setSizes(data.size?.split("|").map(i => ({ id: Math.random().toString(), value: i })) ?? []);
                setMaterials(data.material?.split("|").map(i => ({ id: Math.random().toString(), value: i })) ?? []);
                setColors(data.color?.split("|").map(i => ({ id: Math.random().toString(), value: i })) ?? []);
                setDescription(data.description ?? "");
                const images = config.product?.imageProduct ?? [];
                const _images = images.map(item => ({
                    id: item.id ?? Math.random().toString(),
                    link: item.imageLink
                }));
                setImages([..._images]);
            }
            else {
                setName("");
                setPrice(0);
                setNumber(1);
                setSizes([]);
                setMaterials([]);
                setColors([]);
                setDescription("");
                setImages([]);
            }
        }
    }, [show])

    if (materials.length > 0) {
        materials.forEach(item => { item.ref = undefined })
        materials.at(-1).ref = materialRef;
    }

    if (sizes.length > 0) {
        sizes.forEach(item => { item.ref = undefined })
        sizes.at(-1).ref = sizeRef;
    }

    if (colors.length > 0) {
        colors.forEach(item => { item.ref = undefined })
        colors.at(-1).ref = colorRef;
    }

    useEffect(() => {
        materialRef.current?.focus();
    }, [materials.length]);

    useEffect(() => {
        sizeRef.current?.focus();
    }, [sizes.length]);

    useEffect(() => {
        colorRef.current?.focus();
    }, [colors.length]);



    const onAddImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/png";
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
        if (!name || price == 0 || sizes.length == 0 || materials.length == 0 || colors.length == 0) {
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("quantity", number);
        const detail = {
            size: sizes.map(i => i.value).join("|"),
            material: materials.map(i => i.value).join("|"),
            color: colors.map(i => i.value).join("|"),
            description: description
        }
        formData.append("detail", JSON.stringify(detail));
        formData.append("size", sizes.map(item => item.value).join("|"));
        formData.append("color", colors.map(item => item.value).join("|"));
        for (const i of images) {
            if (i.file) {
                formData.append("files", i.file);
            }
        }
        config.onConfirm(formData);
    }

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
                                <div className="flex flex-row text-sm items-center m-3">
                                    <div className="font-semibold min-w-[100px]">Name:</div>
                                    <div className="flex-1 flex h-10">
                                        <input
                                            className="flex-1 outline-none border rounded bg-gray-100 focus-within:border-gray-300 focus-within:bg-white px-2"
                                            placeholder="Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)} />
                                    </div>
                                </div>
                                {
                                    (config.type == "UPDATE" || config.type == "ADD_COLLECTION") && (
                                        <div className="flex flex-row text-sm items-center m-3">
                                            <div className="font-semibold min-w-[100px]">Collection:</div>
                                            <div className="flex-1 flex h-10 flex-row items-center flex-wrap">
                                                {collections.map(_item => (
                                                    <div
                                                        key={_item.id}
                                                        className="relative w-32 h-8 flex">
                                                        <select
                                                            className="flex-1 border border-gray-300 rounded pl-2 mr-2"
                                                            value={JSON.stringify(_item)}
                                                            onChange={e => {
                                                                const tmp = JSON.parse(e.target.value);
                                                                _item.id = tmp.id;
                                                                _item.name = tmp.name;
                                                                setCollections([...collections])
                                                            }}>
                                                            {[{ id: 0, name: "Select" }, ...listCollection].map(item => (
                                                                <option
                                                                    key={item.id}
                                                                    value={JSON.stringify({
                                                                        id: item.id,
                                                                        name: item.name
                                                                    })}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <FontAwesomeIcon
                                                            icon={faCircleXmark}
                                                            className="absolute -top-1 right-[2px] cursor-pointer text-sm hover:opacity-70 text-gray-600 z-[1]"
                                                            onClick={() => {
                                                                _.remove(collections, i => i.id == _item.id);
                                                                setCollections([...collections])
                                                            }} />
                                                    </div>
                                                ))}
                                                <div
                                                    className="px-2 flex items-center justify-center font-semibold text-sm border border-gray-300 rounded hover:bg-black hover:text-white cursor-pointer h-8"
                                                    onClick={() => {
                                                        collections.push({
                                                            id: Math.random().toString(),
                                                            name: "Select"
                                                        });
                                                        setCollections([...collections]);
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        className="mr-1" />
                                                    ADD
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="flex flex-row text-sm items-center m-3">
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
                                <div className="flex flex-row text-sm items-center m-3">
                                    <div className="font-semibold min-w-[100px]">Number:</div>
                                    <div className="flex-1 flex h-10">
                                        <input
                                            className="flex-1 outline-none border rounded bg-gray-100 focus-within:border-gray-300 focus-within:bg-white px-2"
                                            placeholder="Number"
                                            value={number}
                                            type="number"
                                            onChange={e => setNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm items-center m-3">
                                    <div className="font-semibold min-w-[100px]">Size:</div>
                                    <div className="flex-1 flex h-10 flex-row items-center">
                                        {sizes.map((item) => (
                                            <div
                                                key={item.id}
                                                className="w-12 h-8 flex mr-2 relative">
                                                <input
                                                    value={item.value}
                                                    id={item.id}
                                                    ref={item.ref ?? undefined}
                                                    className="flex-1 overflow-hidden outline-none border-[2px] rounded border-gray-300 focus-within:bg-white focus-within:border-gray-600 text-center text-sm font-semibold"
                                                    onChange={e => {
                                                        item.value = e.target.value;
                                                        setSizes([...sizes])
                                                    }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    className="absolute -top-1 -right-1 cursor-pointer text-sm hover:opacity-70 text-gray-600"
                                                    onClick={() => {
                                                        _.remove(sizes, i => i.id == item.id);
                                                        setSizes([...sizes]);
                                                    }} />
                                            </div>
                                        ))}
                                        <div
                                            className="px-2 flex items-center justify-center font-semibold text-sm border border-gray-300 rounded hover:bg-black hover:text-white cursor-pointer h-8"
                                            onClick={() => {
                                                const newSize = {
                                                    id: Math.random().toString(),
                                                    value: "",
                                                }
                                                sizes.push(newSize);
                                                setSizes([...sizes]);
                                            }}>
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="mr-1" />
                                            ADD
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm items-center m-3">
                                    <div className="font-semibold min-w-[100px]">Material:</div>
                                    <div className="flex-1 flex h-10 flex-row items-center">
                                        {materials.map((item) => (
                                            <div
                                                key={item.id}
                                                className="w-20 h-8 flex mr-2 relative">
                                                <input
                                                    value={item.value}
                                                    id={item.id}
                                                    ref={item.ref ?? undefined}
                                                    className="flex-1 overflow-hidden outline-none border-[2px] rounded border-gray-300 focus-within:bg-white focus-within:border-gray-600 text-center text-sm font-semibold"
                                                    onChange={e => {
                                                        item.value = e.target.value;
                                                        setMaterials([...materials])
                                                    }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    className="absolute -top-1 -right-1 cursor-pointer text-sm hover:opacity-70 text-gray-600"
                                                    onClick={() => {
                                                        _.remove(materials, i => i.id == item.id);
                                                        setMaterials([...materials]);
                                                    }} />
                                            </div>
                                        ))}
                                        <div
                                            className="px-2 flex items-center justify-center font-semibold text-sm border border-gray-300 rounded hover:bg-black hover:text-white cursor-pointer h-8"
                                            onClick={() => {
                                                const newMaterial = {
                                                    id: Math.random().toString(),
                                                    value: "",
                                                }
                                                materials.push(newMaterial);
                                                setMaterials([...materials]);
                                            }}>
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="mr-1" />
                                            ADD
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm items-center m-3">
                                    <div className="font-semibold min-w-[100px]">Color:</div>
                                    <div className="flex-1 flex h-10 flex-row items-center">
                                        {colors.map((item) => (
                                            <div
                                                key={item.id}
                                                className="w-20 h-8 flex mr-2 relative">
                                                <input
                                                    value={item.value}
                                                    id={item.id}
                                                    ref={item.ref ?? undefined}
                                                    className="flex-1 overflow-hidden outline-none border-[2px] rounded border-gray-300 focus-within:bg-white focus-within:border-gray-600 text-center text-sm font-semibold"
                                                    onChange={e => {
                                                        item.value = e.target.value;
                                                        setColors([...colors])
                                                    }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    className="absolute -top-1 -right-1 cursor-pointer text-sm hover:opacity-70 text-gray-600"
                                                    onClick={() => {
                                                        _.remove(colors, i => i.id == item.id);
                                                        setColors([...colors]);
                                                    }} />
                                            </div>
                                        ))}
                                        <div
                                            className="px-2 flex items-center justify-center font-semibold text-sm border border-gray-300 rounded hover:bg-black hover:text-white cursor-pointer h-8"
                                            onClick={() => {
                                                colors.push({
                                                    id: Math.random().toString(),
                                                    value: "",
                                                });
                                                setColors([...colors]);
                                            }}>
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="mr-1" />
                                            ADD
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm m-3">
                                    <div className="font-semibold min-w-[100px]">Image:</div>
                                    <div className="flex flex-row flex-1 flex-wrap">
                                        {images.map(item => (
                                            <div
                                                key={item.id}
                                                className="flex w-[100px] h-[100px] mr-2 mb-3 cursor-pointer"
                                                onClick={() => {
                                                    const a = document.createElement("a");
                                                    a.target = "__blank";
                                                    a.href = item.link;
                                                    a.click();
                                                    a.remove();
                                                }}>
                                                <img
                                                    src={item.link}
                                                    className="flex-1 object-contain border border-gray-300 rounded" />

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
                                <div className="flex flex-row text-sm m-3">
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