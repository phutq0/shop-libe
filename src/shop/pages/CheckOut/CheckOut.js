import { product1 } from "shop/components/Image"
import className from "./className";
import { provinces, districts, villages } from "shop/share/data";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Api from "shop/api";
import { setListProductDetail, thunkGetCart } from "shop/share/slices/Cart";
import Utils from "shop/share/Utils";
import DropDown from "shop/components/DropDown";
import Api from "api2";

const province_index = {};
const district_index = {};
const village_index = {};

const CheckOut = () => {

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
    const { account } = useSelector(state => state.account);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { listModel } = useSelector(state => state.cart);
    const [addresses, setAddresses] = useState([]);

    const loadCart = () => {
        dispatch(thunkGetCart(account.accountId));
    }

    useEffect(() => {
        if (listModel.length == 0) {
            loadCart();
        }
    }, [])

    const getListAddress = async () => {
        const result = Api.address.getListAddress(account.accountId);
        setAddresses(result.addresses);
    }

    useEffect(() => {
        getListAddress()
    }, [])

    const [selectedAddress, setSelectedAddress] = useState(false);


    useEffect(() => {
        if (selectedAddress) {
            return;
        }
        else {
            setDistrict({ ...defaultDistrict });
        }
        setVillage({ ...defaultVillage });
    }, [province]);

    useEffect(() => {
        if (selectedAddress) {
            return;
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
                accountId: account.accountId,
                addressId: selectedAddress,
                total: listModel.reduce((prev, item) => prev + item.model.product.price * item.number, 0),
                ship: ship,
                shipPrice: ship ? 45000 : 0,
                payment: "Cash"
            }
            const result = Api.order.createOrder(params);
            loadCart();
            Utils.showToastSuccess("Order successfully!");
            navigate("/account/history");
        }
        else {
            const params = {
                name: name,
                phone: phone,
                street: street,
                province: province.name,
                district: district.name,
                village: village.name,
                accountId: account.accountId
            }
            return
            const result = Api.address.createAddress(params);

            // const response = await Api.address.createAddress({
            //     name: name,
            //     phone: phone,
            //     province: province.name,
            //     country: village.name,
            //     district: district.name,
            //     streetNumber: street,
            //     note: "Không có note!"
            // });
            // const params = {
            //     addressId: response.data.id,
            //     userId: response.data.userId,
            //     paymentMethod: "Thanh toán khi nhận hàng",
            //     note: "Không cho note",
            //     total: listProductDetail.reduce((prev, item) => prev + item.price, 0) + (ship ? 45000 : 0),
            //     productIdArray: listProductDetail.map(item => item.id)
            // };
            // await Api.order.createOrder(params);
            // Utils.showToastSuccess("Order successfully!");
            // for (const item of listProductDetail) {
            //     await Api.cart.removeFromCart(item.id);
            // }
            // dispatch(thunkGetCart());
            // navigate("/")
        }
    }

    useLayoutEffect(() => {
        for (const i of provinces) {
            province_index[i.name] = i.id;
        }
        for (const i of districts) {
            district_index[i.name] = i.id;
        }
        for (const i of villages) {
            village_index[i.name] = i.id;
        }
    }, [])

    return (
        <div className={className.container}>
            <div className={className.right}>
                <div className={className.bill}>
                    <div className="flex flex-col pl-3 w-full">
                        {listModel.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-row h-20 items-center mb-4">
                                <img
                                    src={"http://localhost:4000" + item.model.product.images[0]}
                                    className="object-contain w-20 h-20 border rounded"
                                />
                                <div className="flex flex-col flex-1 pl-2">
                                    <div
                                        className="text-sm">
                                        {item.model.product.name}
                                    </div>
                                    <div
                                        className="text-xs text-gray-500">
                                        {item.model.name.replace(/\|/g, " / ")}
                                    </div>
                                    <div className="text-xs text-gray-500">x{item.number}</div>
                                </div>
                                <div className="font-semibold text-sm flex flex-col">
                                    <div>{item.model.product.price.toLocaleString()}₫</div>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-row justify-between border-t-2 border-black pt-3 text-sm font-semibold">
                            <div>Sum:</div>
                            <div>{listModel.reduce((prev, item) => prev + item.model.product.price * item.number, 0).toLocaleString()}₫</div>
                        </div>
                        <div className="flex flex-row justify-between pt-3 text-sm font-semibold">
                            <div>Ship:</div>
                            <div>{(ship ? 45000 : 0).toLocaleString()}₫</div>
                        </div>
                        <div className="flex flex-row justify-between pt-3 text-base font-semibold">
                            <div>Total:</div>
                            <div>{(listModel.reduce((prev, item) => prev + item.model.product.price * item.number, 0) + (ship ? 45000 : 0)).toLocaleString()}₫</div>
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
                        <DropDown
                            className="w-full"
                            component={(show) => (
                                <div
                                    className="w-full h-10 border rounded flex items-center px-2 cursor-pointer"
                                    style={{ borderColor: show ? "black" : undefined }}>

                                    <div className="!line-clamp-1">
                                        {!selectedAddress ? "New address" : [name, phone, street, village.name, district.name, province.name].join(" - ")}
                                    </div>
                                </div>
                            )
                            }
                            render={
                                <div className="w-full flex flex-col py-1 border rounded shadow-md bg-white -mt-2">
                                    {[{ id_: -1 }, ...addresses].map((item, index) => {
                                        const display = item.id_ ? "New address" : [item.name, item.phone, item.street, item.village, item.district, item.province].join(" - ");
                                        return (
                                            <div
                                                key={item.addressId ?? index}
                                                className="px-2 h-10 flex items-center hover:bg-gray-100 text-sm cursor-pointer"
                                                onClick={() => {
                                                    if (item.id_) {
                                                        setSelectedAddress(false)
                                                        setName("");
                                                        setPhone("");
                                                        setStreet("");
                                                        setProvince({ ...defaultProvince })
                                                    }
                                                    else {
                                                        setSelectedAddress(item.addressId);
                                                        setName(item.name);
                                                        setPhone(item.phone);
                                                        setStreet(item.street)
                                                        setProvince({
                                                            id: province_index[item.province],
                                                            name: item.province
                                                        })
                                                        setDistrict({
                                                            id: district_index[item.district],
                                                            name: item.district
                                                        })
                                                        setVillage({
                                                            id: village_index[item.village],
                                                            name: item.village
                                                        })
                                                    }
                                                }}>
                                                <div className="!line-clamp-1">
                                                    {display}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            } />
                    </div>
                    <div className="flex flex-col mt-3">
                        <div className="border rounded border-gray-300 flex h-10 mb-3">
                            <input
                                placeholder="Name"
                                className="flex-1 rounded bg-gray-100 focus-within:bg-white outline-none px-2 text-sm"
                                value={name}
                                disabled={selectedAddress}
                                onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="border rounded border-gray-300 flex h-10 mb-3">
                            <input
                                placeholder="Phone"
                                className="flex-1 rounded bg-gray-100 focus-within:bg-white outline-none px-2 text-sm"
                                value={phone}
                                disabled={selectedAddress}
                                onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div className="border rounded border-gray-300 flex h-10 mb-3">
                            <input
                                placeholder="Street/House"
                                className="flex-1 rounded bg-gray-100 focus-within:bg-white outline-none px-2 text-sm"
                                value={street}
                                disabled={selectedAddress}
                                onChange={e => setStreet(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col mb-3">
                                <div className="text-sm font-semibold">Select Province/City</div>
                                <DropDown
                                    className="w-full"
                                    disable={selectedAddress}
                                    component={show => (
                                        <div
                                            className="w-full h-10 border rounded flex items-center px-2"
                                            style={{ borderColor: show ? "black" : undefined }}>
                                            {province.name}
                                        </div>
                                    )}
                                    render={
                                        <div className="w-full h-[300px] bg-white rounded shadow-xl overflow-y-scroll py-1 border -mt-2">
                                            {[defaultProvince, ...provinces].map(item => (
                                                <div
                                                    key={item.id}
                                                    className="h-8 flex items-center pl-2 hover:bg-gray-100 hover:font-semibold"
                                                    onClick={() => setProvince(item)}>
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    } />

                            </div>
                            <div className="flex flex-col mb-3">
                                <div className="text-sm font-semibold">Select District</div>
                                <DropDown
                                    className="w-full"
                                    disable={selectedAddress}
                                    component={show => (
                                        <div
                                            className="w-full h-10 border rounded flex items-center px-2"
                                            style={{ borderColor: show ? "black" : undefined }}>
                                            {district.name}
                                        </div>
                                    )}
                                    render={
                                        <div className="w-full max-h-[300px] bg-white rounded shadow-xl overflow-y-scroll py-1 border -mt-2">
                                            {[defaultDistrict, ...districts.filter(i => i.provinceId == province.id)].map(item => (
                                                <div
                                                    key={item.id}
                                                    className="h-8 flex items-center pl-2 hover:bg-gray-100 cursor-pointer hover:font-semibold"
                                                    onClick={() => setDistrict(item)}>
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    } />
                            </div>
                            <div className="flex flex-col mb-3">
                                <div className="text-sm font-semibold">Select Village</div>
                                <DropDown
                                    className="w-full"
                                    disable={selectedAddress}
                                    component={show => (
                                        <div
                                            className="w-full h-10 border rounded flex items-center px-2"
                                            style={{ borderColor: show ? "black" : undefined }}>
                                            {village.name}
                                        </div>
                                    )}
                                    render={
                                        <div className="w-full max-h-[300px] bg-white rounded shadow-xl overflow-y-scroll py-1 border -mt-2">
                                            {[defaultVillage, ...villages.filter(i => i.districtId == district.id)].map(item => (
                                                <div
                                                    key={item.id}
                                                    className="h-8 flex items-center pl-2 hover:bg-gray-100 cursor-pointer hover:font-semibold"
                                                    onClick={() => setVillage(item)}>
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    } />
                                {/* <select
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
                                </select> */}
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