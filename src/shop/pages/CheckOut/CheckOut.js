import { product1 } from "shop/components/Image"
import className from "./className";
import { provinces, districts, villages } from "shop/share/data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "shop/api";
import { setListProductDetail, thunkGetCart } from "shop/share/slices/Cart";
import Utils from "shop/share/Utils";

const CheckOut = () => {

    const products = [
        {
            id: 1,
            name: "Black Backless Short Sleeve Top",
            size: "M",
            color: "Black",
            material: "Jersey",
            price: 290000,
            number: 1,
            image: product1
        },
        {
            id: 2,
            name: "Black Backless Short Sleeve Top",
            size: "XL",
            color: "Black",
            material: "Jersey",
            price: 290000,
            number: 1,
            image: product1
        },
    ]
    const defaultProvince = {
        id: 0,
        name: "Select Province/City"
    }
    const defaultDistrict = {
        id: 0,
        name: "Select District",
        provinceId: 0
    }
    const defaultVillage = {
        id: 0,
        name: "Select Village",
        districtId: 0
    }
    const [province, setProvince] = useState({ ...defaultProvince });
    const [district, setDistrict] = useState({ ...defaultDistrict });
    const [village, setVillage] = useState({ ...defaultVillage });

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");

    const [ship, setShip] = useState(true);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { listProduct, listProductDetail } = useSelector(state => state.cart);
    const [addresses, setAddresses] = useState([]);

    const getData = async () => {
        const data = [];
        for (const item of listProduct) {
            const response = await Api.product.getProductInformation(item.productId);
            const product = response.data.product;
            data.push({
                ...product,
                images: product.imageProduct.map(item => item.imageLink),
                detail: JSON.parse(product.detail ?? "{}")
            })
        }
        dispatch(setListProductDetail(data))
    }

    const getListAddress = async () => {
        const response = await Api.address.getListAddress({
            pageSize: 100,
            page: 1
        });
        const arr = response.data.items.filter(i => i.userId == 2);
        const address = arr.map(item => ({
            ...item,
            province_: provinces.filter(i => i.name == item.province)[0],
            district_: districts.filter(i => i.name == item.district)[0],
            village_: villages.filter(i => i.name == item.country)[0],
        }))
        setAddresses(address);
    }

    useEffect(() => {
        getListAddress()
    }, [])

    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        getData();
    }, [listProduct])

    useEffect(() => {
        if (selectedAddress) {
            setDistrict({ ...selectedAddress.district_ });
        }
        else {
            setDistrict({ ...defaultDistrict });
        }
        setVillage({ ...defaultVillage });
    }, [province]);

    useEffect(() => {
        if (selectedAddress) {
            setVillage({ ...selectedAddress.village_ });
        }
        else {
            setVillage({ ...defaultVillage });
        }
    }, [district]);

    const handleOrder = async () => {
        if (!name || !name || !street || province.id == 0 || district.id === 0 || village.id == 0) {
            return;
        }
        if (selectedAddress) {
            const params = {
                addressId: selectedAddress.id,
                userId: selectedAddress.userId,
                paymentMethod: "Thanh toán khi nhận hàng",
                note: "Không cho note",
                total: listProductDetail.reduce((prev, item) => prev + item.price, 0) + (ship ? 45000 : 0),
                productIdArray: listProductDetail.map(item => item.id)
            };
            const response = await Api.order.createOrder(params);
            Utils.showToastSuccess("Order successfully!");
            for (const item of listProductDetail) {
                await Api.cart.removeFromCart(item.id);
            }
            dispatch(thunkGetCart());
            navigate("/")
        }
        else {
            const response = await Api.address.createAddress({
                name: name,
                phone: phone,
                province: province.name,
                country: village.name,
                district: district.name,
                streetNumber: street,
                note: "Không có note!"
            });
            const params = {
                addressId: response.data.id,
                userId: response.data.userId,
                paymentMethod: "Thanh toán khi nhận hàng",
                note: "Không cho note",
                total: listProductDetail.reduce((prev, item) => prev + item.price, 0) + (ship ? 45000 : 0),
                productIdArray: listProductDetail.map(item => item.id)
            };
            await Api.order.createOrder(params);
            Utils.showToastSuccess("Order successfully!");
            for (const item of listProductDetail) {
                await Api.cart.removeFromCart(item.id);
            }
            dispatch(thunkGetCart());
            navigate("/")
        }
    }

    return (
        <div className={className.container}>
            <div className={className.right}>
                <div className={className.bill}>
                    <div className="flex flex-col pl-3 w-full">
                        {listProductDetail.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-row h-20 items-center mb-4">
                                <img
                                    src={item.images[0]}
                                    className="object-contain w-20 h-20 border rounded"
                                />
                                <div className="flex flex-col flex-1 pl-2">
                                    <div
                                        className="text-sm">
                                        {item.name}
                                    </div>
                                    <div
                                        className="text-xs text-gray-500">
                                        {item.detail.color.split("|").at(0)} / {item.detail.material.split("|").at(0)} / {item.detail.size.split("|").at(0)}
                                    </div>
                                </div>
                                <div className="font-semibold text-sm">{item.price.toLocaleString()}₫</div>
                            </div>
                        ))}
                        <div className="flex flex-row justify-between border-t-2 border-black pt-3 text-sm font-semibold">
                            <div>Sum:</div>
                            <div>{listProductDetail.reduce((prev, item) => prev + item.price, 0).toLocaleString()}₫</div>
                        </div>
                        <div className="flex flex-row justify-between pt-3 text-sm font-semibold">
                            <div>Ship:</div>
                            <div>{(ship ? 45000 : 0).toLocaleString()}₫</div>
                        </div>
                        <div className="flex flex-row justify-between pt-3 text-base font-semibold">
                            <div>Total:</div>
                            <div>{(listProductDetail.reduce((prev, item) => prev + item.price, 0) + (ship ? 45000 : 0)).toLocaleString()}₫</div>
                        </div>
                    </div>
                    <div
                        className="w-32 h-12 mt-4 flex items-center justify-center text-sm font-semibold border rounded hover:bg-black hover:text-white cursor-pointer"
                        onClick={handleOrder}>
                        ORDER
                    </div>
                </div>
            </div>
            <div className={className.left}>
                <div className={className.info}>
                    <div className={className.title}>
                        Deliver Information
                    </div>
                    <div className={className.top}>
                        {/* <div className={className.account}>
                            Had account?
                        </div>
                        <div className={className.login}>
                            Login
                        </div> */}
                        <select
                            className="w-full border rounded border-gray-300 py-3 text-sm font-semibold"
                            onChange={e => {
                                const tmp = JSON.parse(e.target.value);
                                if (tmp.id != 0) {
                                    setSelectedAddress(tmp);
                                    setName(tmp.name);
                                    setPhone(tmp.phone);
                                    setStreet(tmp.streetNumber);
                                    setVillage(tmp.village_);
                                    setDistrict(tmp.district_);
                                    setProvince(tmp.province_);
                                }
                                else {
                                    setSelectedAddress(null);
                                    setName("");
                                    setPhone("");
                                    setStreet("");
                                    setProvince({ ...defaultProvince });
                                }
                            }}>
                            {[{ id: 0, name: "Select" }, ...addresses].map(item => {
                                const display = item.id == 0 ? "Select Saved Address" : [item.name, item.phone, item.streetNumber, item.country, item.district].join(", ")
                                return (
                                    <option
                                        key={item.id}
                                        value={JSON.stringify(item)}>
                                        {display}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col mt-3">
                        <div className="border rounded border-gray-300 flex h-10 mb-3">
                            <input
                                placeholder="Name"
                                className="flex-1 rounded bg-gray-100 focus-within:bg-white outline-none px-2 text-sm"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="border rounded border-gray-300 flex h-10 mb-3">
                            <input
                                placeholder="Phone"
                                className="flex-1 rounded bg-gray-100 focus-within:bg-white outline-none px-2 text-sm"
                                value={phone}
                                onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div className="border rounded border-gray-300 flex h-10 mb-3">
                            <input
                                placeholder="Street/House"
                                className="flex-1 rounded bg-gray-100 focus-within:bg-white outline-none px-2 text-sm"
                                value={street}
                                onChange={e => setStreet(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col mb-3">
                                <div className="text-sm font-semibold">Select Province/City</div>
                                <select
                                    className="h-10 border rounder text-sm rounded border-gray-300"
                                    value={JSON.stringify(province)}
                                    onChange={i => setProvince(JSON.parse(i.target.value))}>
                                    {[defaultProvince, ...provinces].map(item => (
                                        <option
                                            key={item.id}
                                            value={JSON.stringify(item)}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <div className="text-sm font-semibold">Select District</div>
                                <select
                                    className="h-10 border rounder text-sm rounded border-gray-300"
                                    value={JSON.stringify(district)}
                                    onChange={i => setDistrict(JSON.parse(i.target.value))}>
                                    {[defaultDistrict, ...districts.filter(i => i.provinceId == province.id)].map(item => (
                                        <option
                                            key={item.id}
                                            value={JSON.stringify(item)}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <div className="text-sm font-semibold">Select Village</div>
                                <select
                                    className="h-10 border rounder text-sm rounded border-gray-300"
                                    value={JSON.stringify(village)}
                                    onChange={i => setVillage(JSON.parse(i.target.value))}>
                                    {[defaultVillage, ...villages.filter(i => i.districtId == district.id)].map(item => (
                                        <option
                                            key={item.id}
                                            value={JSON.stringify(item)}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-3 test-sm font-semibold">Deliver Method:</div>
                        <div
                            className={"flex flex-row items-center py-6 px-3 border-2 rounded border-gray-200 cursor-pointer hover:bg-gray-100 mb-3" + (ship ? " border-gray-400" : "")}
                            onClick={() => setShip(1)}>
                            <input
                                className="h-[20px] w-[20px] accent-black cursor-pointer"
                                readOnly={true}
                                checked={ship}
                                type={"radio"} />
                            <div className="flex-1 ml-3 text-sm font-semibold">Ship</div>
                            <div className="text-sm font-semibold">45.000₫</div>
                        </div>
                        <div
                            className={"flex flex-row items-center py-6 px-3 border-2 rounded border-gray-200 cursor-pointer hover:bg-gray-100 mb-3" + (!ship ? " border-gray-400" : "")}
                            onClick={() => setShip(0)}>
                            <input
                                className="h-[20px] w-[20px] accent-black cursor-pointer"
                                readOnly={true}
                                checked={!ship}
                                type={"radio"} />
                            <div className="flex-1 ml-3 text-sm font-semibold">Take Yourself</div>
                            <div className="text-sm font-semibold">0₫</div>
                        </div>
                        <div className="mb-3 test-sm font-semibold">Payment Method:</div>
                        <div
                            className={"flex flex-row items-center py-6 px-3 border-2 rounded border-gray-400 cursor-pointer hover:bg-gray-100 mb-3 "}>
                            <input
                                className="h-[20px] w-[20px] accent-black cursor-pointer"
                                readOnly={true}
                                checked={true}
                                type={"radio"} />
                            <div className="flex-1 ml-3 text-sm font-semibold">Pay on delivery</div>
                            <div className="text-sm font-semibold"></div>
                        </div>
                        {/* <div
                            className={"flex flex-row items-center py-4 px-3 border-2 rounded border-gray-300 cursor-pointer hover:bg-gray-100 mb-3" + (!ship ? " border-gray-500" : "")}
                            onClick={() => setShip(0)}>
                            <input
                                className="h-[20px] w-[20px] accent-black cursor-pointer"
                                readOnly={true}
                                checked={!ship}
                                type={"radio"} />
                            <div className="flex-1 ml-3 text-sm">Take Yourself</div>
                            <div className="text-sm font-semibold">0₫</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut