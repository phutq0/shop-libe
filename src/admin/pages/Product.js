import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "admin/components"
import { modalProductRef } from "admin/components/Modal";
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

    const loadData = () => {
        const result = Api.collection.getListCollection({
            page,
            limit: step,
        });
        console.log(result);
        setData(result);
    }

    useEffect(() => {

    }, [page, step]);

    const handleCreate = async () => {
        modalProductRef.current.show({
            type: 'CREATE',
            onConfirm: async (params) => {

            }
        })
    }

    const handleUpdate = async (item) => {
        modalProductRef.current.show({
            type: 'UPDATE',
            product: item,
            buttonRight: "Save"
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
                onChangeStep={step => setStep(step)}
                onClickAdd={handleCreate}
                header={
                    <div className="flex flex-row text-sm font-semibold py-2 items-center">
                        <div className="flex-[1] text-center text-gray-400">ID</div>
                        <div className="flex-[3] text-center text-gray-400">NAME</div>
                        <div className="flex-[1] text-center text-gray-400">NUMBER</div>
                        <div className="flex-[1] text-center text-gray-400">PRICE</div>
                        <div className="flex-[1] text-center text-gray-400">MANAGE</div>
                    </div>
                }
                body={
                    <div className="flex flex-col">
                        {data.products.map((item, index) => (
                            <div
                                key={item.id ?? index}
                                className={"flex flex-row text-sm border-t border-b border-gray-100 font-semibold py-1 h-14 items-center hover:bg-gray-100 cursor-pointer " + (index % 2 == 0 ? "bg-gray-50" : "")}>
                                <div
                                    className="flex-[1] text-center"
                                    onClick={() => handleUpdate(item)}>
                                    {item.id}
                                </div>
                                <div
                                    className="flex-[3]"
                                    onClick={() => handleUpdate(item)}>
                                    {item.name}
                                </div>
                                <div className="flex-[1] text-center" onClick={() => handleUpdate(item)}>
                                    {item.quantity}
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
                                            await Api.product.deleteProduct(item.id);
                                            Utils.showToastSuccess("Delete successfully!");
                                            dispatch(thunkGetProduct({
                                                page: page,
                                                pageSize: step
                                            }));
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