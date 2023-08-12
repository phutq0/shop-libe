import { useEffect, useState } from "react";
import className from "./className"
import Api from "api2";
import { useSelector } from "react-redux";

const History = () => {

    const { account } = useSelector(state => state.account);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const result = Api.order.getListOrder(account.accountId);
        setOrders(result.orders);
    }, [])


    return (
        <div className={className.wrapper}>
            {orders.map((item, index) => (
                <div
                    key={item.orderId ?? index}
                    className="flex flex-col p-2 border rounded mb-3 shadow">
                    <div className="text-sm font-semibold pb-3 border-b">
                        {`Status: ${item.status}`}
                    </div>
                    <div className="text-sm font-semibold pb-3 pt-2 border-b flex flex-col">
                        <div className="flex flex-row">
                            <div className="font-normal mr-2">Name: </div>
                            <div>{item.address.name}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="font-normal mr-2">Phone: </div>
                            <div>{item.address.phone}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="font-normal mr-2">Address: </div>
                            <div>{`${item.address.street}, ${item.address.village}, ${item.address.district}, ${item.address.province}`}</div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {item.models.map((_item, _index) => (
                            <div
                                key={_index}
                                className="flex flex-row h-20 items-center mb-4 font-semibold">
                                <div className="font-semibold mr-3">{index + 1}.</div>
                                <img
                                    src={"http://localhost:4000" + _item.model.product.images[0]}
                                    className="object-contain w-20 h-20 border rounded"
                                />
                                <div className="flex flex-col flex-1 pl-2">
                                    <div
                                        className="text-sm">
                                        {_item.model.product.name}
                                    </div>
                                    <div
                                        className="text-xs text-gray-500">
                                        {_item.model.name.replace(/\|/g, " / ")}
                                    </div>
                                    <div className="text-xs text-gray-500">x{_item.number}</div>
                                </div>
                                <div className="font-semibold text-sm flex flex-col">
                                    <div>{_item.model.product.price.toLocaleString()}₫</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row justify-between border-t-2 border-black pt-3 text-sm font-semibold">
                        <div>Sum:</div>
                        <div>{item.models.reduce((prev, item) => prev + item.model.product.price * item.number, 0).toLocaleString()}₫</div>
                    </div>
                    <div className="flex flex-row justify-between pt-3 text-sm font-semibold">
                        <div>Ship:</div>
                        <div>{(item.ship ? 45000 : 0).toLocaleString()}₫</div>
                    </div>
                    <div className="flex flex-row justify-between pt-3 text-base font-semibold">
                        <div>Total:</div>
                        <div>{(item.models.reduce((prev, item) => prev + item.model.product.price * item.number, 0) + (item.ship ? 45000 : 0)).toLocaleString()}₫</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default History