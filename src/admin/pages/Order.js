import Api from "api2";
import { useEffect, useRef, useState } from "react"
import { Table } from "admin/components"
import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { orderRef } from "admin/components/Modal";
import Utils from "shop/share/Utils";


const Order = () => {

    const [data, setData] = useState({
        orders: [],
        total: 0
    });

    const [page, setPage] = useState(0);
    const [step, setStep] = useState(5);

    const loadData = () => {
        const result = Api.order.getListOrder(undefined, page, step);
        console.log(result);
        setData(result);
    }

    useEffect(() => {
        loadData();
    }, [page, step]);

    const handleCreate = () => {

    }
    const handleUpdate = (item) => {
        orderRef.current.show({
            order: item,
            onConfirm: (orderId, status) => {
                const result = Api.order.updateOrder(orderId, status);
                Utils.showToastSuccess("Update status successfully!");
                loadData();
                orderRef.current.hide();
            }
        })
    }


    return (
        <div className="p-4">
            <Table
                name={"Collection"}
                showButtonDelete={true}
                isLoading={false}
                isEmpty={data.orders.length == 0}
                total={Math.ceil(data.total / step) || 1}
                page={page + 1}
                onChangePage={page => setPage(page - 1)}
                step={step}
                // search={query}
                // onChangeSearch={e => setQuery(e.target.value)}
                onChangeStep={step => setStep(step)}
                onClickAdd={handleCreate}
                header={
                    <div className="flex flex-row text-sm font-semibold p-2 items-center">
                        <div className="flex-[1] text-gray-400">ID</div>
                        <div className="flex-[1.5] text-gray-400">TOTAL</div>
                        <div className="flex-[1] text-gray-400">NUMBER PRODUCT</div>
                        <div className="flex-[1] text-gray-400 text-center" >STATUS</div>
                        <div className="flex-[1] text-center text-gray-400">MANAGE</div>
                    </div>
                }
                body={
                    <div className="flex flex-col">
                        {data.orders.map((item, index) => (
                            <div
                                key={item.orderId ?? index}
                                className={"flex flex-row text-sm border-t px-2 border-b border-gray-100 font-semibold py-1 min-h-[72px] hover:bg-gray-100 cursor-pointer " + (index % 2 == 0 ? "bg-gray-50" : "")}>
                                <div
                                    className="flex-[1] flex items-center"
                                    onClick={() => handleUpdate(item)}>
                                    {item.orderId}
                                </div>
                                <div
                                    className="flex-[1.5] line-clamp-2 flex items-center"
                                    onClick={() => handleUpdate(item)}>
                                    {item.total.toLocaleString()}₫
                                </div>
                                <div
                                    className="flex-[1] text-center flex items-center justify-center"
                                    onClick={() => handleUpdate(item)}>
                                    {item.models.length}
                                </div>
                                <div
                                    className="flex-[1] text-center flex items-center justify-center"
                                    onClick={() => handleUpdate(item)}>
                                    {item.status}
                                </div>
                                <div className="flex-[1] text-center text-lg text-gray-500 flex items-center justify-center">
                                    <FontAwesomeIcon
                                        className="hover:text-blue-600"
                                        icon={faGear}
                                        onClick={() => handleUpdate(item)} />
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className="ml-2 hover:text-red-600"
                                        onClick={async () => {

                                        }} />
                                </div>
                            </div>
                        ))}
                    </div>
                }
            />
        </div>
    )
}

export default Order