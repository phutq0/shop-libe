import { useEffect, useLayoutEffect, useState } from "react";
import className from "./className"
import { useSelector } from "react-redux";
import Api from "api2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DropDown from "shop/components/DropDown/DropDown";
import { provinces, districts, villages } from "shop/share/data";
import Utils from "shop/share/Utils";
import _ from "lodash";
const province_index = {};
const district_index = {};
// const province_index = {};

const Addresses = () => {

    const [addresses, setAddresses] = useState([]);
    const { account } = useSelector(state => state.account);


    const loadData = () => {
        const result = Api.address.getListAddress(account.accountId);
        console.log(result);
        setAddresses(result.addresses.map(item => ({
            ...item,
            id: Math.random().toString(),
            edit: false
        })));
    }

    useLayoutEffect(() => {
        for (const i of provinces) {
            province_index[i.name] = i.id;
        }
        for (const i of districts) {
            district_index[i.name] = i.id;
        }
    }, [])

    useEffect(() => {
        loadData()
    }, [])


    return (
        <div className={className.wrapper}>
            <div className="flex-1 px-2 flex flex-col">
                {addresses.map((item, index) => (
                    <div
                        key={item.id ?? index}
                        className="flex border rounded shadow mb-2 flex-col p-4">
                        <div className="flex flex-row text-sm font-semibold items-center mb-2">
                            <div className="w-28">Name:</div>
                            <input
                                className="flex-1 h-10 px-2 border rounded border-gray-200 bg-gray-100 focus-within:bg-white focus-within:border-x-gray-400 font-normal outline-none"
                                value={item.name}
                                disabled={!item.edit}
                                onChange={e => {
                                    item.name = e.target.value;
                                    setAddresses([...addresses])
                                }} />
                        </div>
                        <div className="flex flex-row text-sm font-semibold items-center mb-2">
                            <div className="w-28">Phone:</div>
                            <input
                                className="flex-1 h-10 px-2 border rounded border-gray-200 bg-gray-100 focus-within:bg-white focus-within:border-x-gray-400 font-normal outline-none"
                                value={item.phone}
                                disabled={!item.edit}
                                onChange={e => {
                                    item.phone = e.target.value;
                                    setAddresses([...addresses])
                                }} />
                        </div>
                        <div className="flex flex-row text-sm font-semibold items-center mb-2">
                            <div className="w-28">Street/House:</div>
                            <input
                                className="flex-1 h-10 px-2 border rounded border-gray-200 bg-gray-100 focus-within:bg-white focus-within:border-x-gray-400 font-normal outline-none"
                                value={item.street}
                                disabled={!item.edit}
                                onChange={e => {
                                    item.street = e.target.value;
                                    setAddresses([...addresses])
                                }} />
                        </div>
                        <div className="flex flex-row text-sm font-semibold items-center mb-2">
                            <div className="w-28">Province/City:</div>
                            {item.edit ? (
                                <DropDown
                                    className="flex-1"
                                    component={show => (
                                        <div
                                            className="w-full h-10 border rounded flex items-center px-2 cursor-pointer"
                                            style={{ borderColor: show ? "black" : undefined }}>
                                            {item.province}
                                        </div>
                                    )}
                                    render={
                                        <div className="w-full max-h-[300px] bg-white rounded shadow-xl overflow-y-scroll py-1 border -mt-2">
                                            {[...provinces].map(item_ => (
                                                <div
                                                    key={item_.id}
                                                    className="h-8 flex items-center pl-2 hover:bg-gray-100 cursor-pointer hover:font-semibold"
                                                    onClick={() => {
                                                        item.province = item_.name;
                                                        setAddresses([...addresses])
                                                    }}>
                                                    {item_.name}
                                                </div>
                                            ))}
                                        </div>
                                    } />
                            ) : (
                                <input
                                    className="flex-1 h-10 px-2 border rounded border-gray-200 bg-gray-100 focus-within:bg-white focus-within:border-x-gray-400 font-normal outline-none"
                                    value={item.province}
                                    disabled={!item.edit}
                                />
                            )}
                        </div>
                        <div className="flex flex-row text-sm font-semibold items-center mb-2">
                            <div className="w-28">District/Town:</div>
                            {item.edit ? (
                                <DropDown
                                    className="flex-1"
                                    component={show => (
                                        <div
                                            className="w-full h-10 border rounded flex items-center px-2 cursor-pointer"
                                            style={{ borderColor: show ? "black" : undefined }}>
                                            {item.district}
                                        </div>
                                    )}
                                    render={
                                        <div className="w-full max-h-[300px] bg-white rounded shadow-xl overflow-y-scroll py-1 border -mt-2">
                                            {districts.filter(i => i.provinceId == province_index[item.province]).map(item_ => (
                                                <div
                                                    key={item_.id}
                                                    className="h-8 flex items-center pl-2 hover:bg-gray-100 cursor-pointer hover:font-semibold"
                                                    onClick={() => {
                                                        item.district = item_.name;
                                                        setAddresses([...addresses])
                                                    }}>
                                                    {item_.name}
                                                </div>
                                            ))}
                                        </div>
                                    } />
                            ) : (
                                <input
                                    className="flex-1 h-10 px-2 border rounded border-gray-200 bg-gray-100 focus-within:bg-white focus-within:border-x-gray-400 font-normal outline-none"
                                    value={item.district}
                                    disabled={!item.edit}
                                />
                            )}
                        </div>
                        <div className="flex flex-row text-sm font-semibold items-center mb-2">
                            <div className="w-28">Village:</div>
                            {item.edit ? (
                                <DropDown
                                    className="flex-1"
                                    component={show => (
                                        <div
                                            className="w-full h-10 border rounded flex items-center px-2 cursor-pointer"
                                            style={{ borderColor: show ? "black" : undefined }}>
                                            {item.village}
                                        </div>
                                    )}
                                    render={
                                        <div className="w-full max-h-[300px] bg-white rounded shadow-xl overflow-y-scroll py-1 border -mt-2">
                                            {villages.filter(i => i.districtId == district_index[item.district]).map(item_ => (
                                                <div
                                                    key={item_.id}
                                                    className="h-8 flex items-center pl-2 hover:bg-gray-100 cursor-pointer hover:font-semibold"
                                                    onClick={() => {
                                                        item.village = item_.name;
                                                        setAddresses([...addresses])
                                                    }}>
                                                    {item_.name}
                                                </div>
                                            ))}
                                        </div>
                                    } />
                            ) : (
                                <input
                                    className="flex-1 h-10 px-2 border rounded border-gray-200 bg-gray-100 focus-within:bg-white focus-within:border-x-gray-400 font-normal outline-none"
                                    value={item.village}
                                    disabled={!item.edit}
                                />
                            )}
                        </div>
                        <div className="flex flex-row-reverse">
                            <div className="h-10 w-24 flex items-center justify-center border rounded hover:bg-black hover:text-white cursor-pointer font-semibold text-sm"
                                onClick={() => {
                                    if (item.addressId) {
                                        const result = Api.address.deleteAddress(item.addressId);
                                        Utils.showToastSuccess("Delete address successfully!");
                                        loadData();
                                    }
                                    else {
                                        _.remove(addresses, i => i.id == item.id);
                                        setAddresses([...addresses]);
                                        Utils.showToastSuccess("Remove address successfully!");
                                    }
                                }}>
                                <FontAwesomeIcon
                                    className="mr-2 text-red-600"
                                    icon={faTrashCan} />
                                DELETE
                            </div>
                            <div className="h-10 w-24 flex items-center justify-center border rounded hover:bg-black hover:text-white cursor-pointer font-semibold mr-3 text-sm"
                                onClick={() => {
                                    if (item.edit) {
                                        if (item.addressId) {
                                            const result = Api.address.updateAddress({
                                                addressId: item.addressId,
                                                name: item.name,
                                                phone: item.phone,
                                                street: item.street,
                                                province: item.province,
                                                district: item.district,
                                                village: item.village,
                                                accountId: item.accountId
                                            });
                                            Utils.showToastSuccess("Update address successfully!");
                                            loadData();
                                        }
                                        else {
                                            const result = Api.address.createAddress({
                                                name: item.name,
                                                phone: item.phone,
                                                street: item.street,
                                                province: item.province,
                                                district: item.district,
                                                village: item.village,
                                                accountId: item.accountId
                                            });
                                            Utils.showToastSuccess("Create address successfully!");
                                            loadData();
                                        }
                                    }
                                    else {
                                        item.edit = true;
                                        setAddresses([...addresses])
                                    }
                                }}>
                                <FontAwesomeIcon
                                    className="mr-2 text-blue-500"
                                    icon={item.edit ? faCheck : faPen} />
                                {item.edit ? "SAVE" : "EDIT"}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex flex-col items-center">
                    <div className="h-10 w-24 flex items-center justify-center border rounded hover:bg-black hover:text-white cursor-pointer font-semibold text-sm"
                        onClick={() => {
                            addresses.push({
                                id: Math.random().toString(),
                                name: "",
                                phone: "",
                                street: "",
                                province: "Select",
                                district: "Select",
                                village: "Select",
                                accountId: account.accountId,
                                edit: true
                            })
                            setAddresses([...addresses])
                        }}>
                        <FontAwesomeIcon
                            className="mr-2 text-red-600"
                            icon={faPlus} />
                        ADD
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addresses