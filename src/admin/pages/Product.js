import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "admin/components"
import { modalProductRef } from "admin/components/Modal";
import Api from "api2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Utils from "shop/share/Utils";

const Product = () => {

    const [data, setData] = useState({
        products: [],
        total: 0
    });

    const [page, setPage] = useState(0);
    const [step, setStep] = useState(5);
    const [query, setQuery] = useState("");

    const loadData = () => {
        const result = Api.product.getListProduct({
            page: page,
            limit: step,
            query: query
        })
        console.log(result);
        setData(result);
    }

    useEffect(() => {
        loadData();
    }, [page, step, query]);

    const handleCreate = async () => {
        modalProductRef.current.show({
            type: 'CREATE',
            onConfirm: async (params) => {
                const result = await Api.product.createProduct(params);
                Utils.showToastSuccess("Create successfully!");
                modalProductRef.current.hide();
                loadData();
            }
        })
    }

    const handleUpdate = async (item) => {
        modalProductRef.current.show({
            type: 'UPDATE',
            product: item,
            buttonRight: "Save",
            onConfirm: async (params) => {
                console.log(params);
                const result = await Api.product.updateProduct(params);
                console.log(result);
                Utils.showToastSuccess("Create successfully!");
                modalProductRef.current.hide();
                loadData();
            }
        })
    }

    return (
        <div className="p-4">
            <Table
                name={"Collection"}
                showButtonDelete={true}
                isLoading={false}
                isEmpty={data.products.length == 0}
                total={Math.ceil(data.total / step) || 1}
                page={page + 1}
                onChangePage={page => setPage(page - 1)}
                step={step}
                search={query}
                onChangeSearch={e => setQuery(e.target.value)}
                onChangeStep={step => setStep(step)}
                onClickAdd={handleCreate}
                header={
                    <div className="flex flex-row text-sm font-semibold p-2 items-center">
                        <div className="flex-[0.8] text-center text-gray-400">ID</div>
                        <div className="flex-[3] text-gray-400">NAME</div>
                        <div className="flex-[0.8] text-center text-gray-400">TOTAL</div>
                        <div className="flex-[0.8] text-center text-gray-400">SOLD</div>
                        <div className="flex-[0.8] text-center text-gray-400">REMAIN</div>
                        <div className="flex-[1] text-center text-gray-400">PRICE</div>
                        <div className="flex-[1] text-center text-gray-400">MANAGE</div>
                    </div>
                }
                body={
                    <div className="flex flex-col">
                        {data.products.map((item, index) => (
                            <div
                                key={item.productId ?? index}
                                className={"flex flex-row p-2 text-sm border-t border-b border-gray-100 font-semibold py-1 h-14 items-center hover:bg-gray-100 cursor-pointer " + (index % 2 == 0 ? "bg-gray-50" : "")}>
                                <div
                                    className="flex-[0.8] text-center"
                                    onClick={() => handleUpdate(item)}>
                                    {item.productId}
                                </div>
                                <div
                                    className="flex-[3]"
                                    onClick={() => handleUpdate(item)}>
                                    {item.name}
                                </div>
                                <div className="flex-[0.8] text-center" onClick={() => handleUpdate(item)}>
                                    {item.models.data.reduce((prev, item) => prev + item.number, 0)}
                                </div>
                                <div className="flex-[0.8] text-center" onClick={() => handleUpdate(item)}>
                                    {item.models.data.reduce((prev, item) => prev + item.sold, 0)}
                                </div>
                                <div className="flex-[0.8] text-center" onClick={() => handleUpdate(item)}>
                                    {item.models.data.reduce((prev, item) => prev + item.remain, 0)}
                                </div>
                                <div className="flex-[1] text-center" onClick={() => handleUpdate(item)}>
                                    {item.price?.toLocaleString()}₫
                                </div>
                                <div className="flex-[1] text-center text-lg text-gray-500">
                                    <FontAwesomeIcon
                                        className="hover:text-blue-600"
                                        icon={faGear}
                                        onClick={() => handleUpdate(item)} />
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className="ml-2 hover:text-red-600"
                                        onClick={async () => {
                                            Api.product.deleteProduct(item.productId);
                                            Utils.showToastSuccess("Delete successfully!");
                                            loadData();
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

export default Product