import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "admin/components"
import { modalProductRef } from "admin/components/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "shop/api";
import Utils from "shop/share/Utils";
import { setPage, setStep, thunkGetProduct } from "shop/share/slices/Product";

const Product = () => {

    const dispatch = useDispatch();

    const { isLoading, page, step, total, listProduct } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(thunkGetProduct({
            page: page,
            pageSize: step
        }));
    }, [page, step]);

    const handleCreate = async () => {
        modalProductRef.current.show({
            type: 'CREATE',
            onConfirm: async (formData) => {
                const response = await Api.product.createProduct(formData);
                Utils.showToastSuccess("Create product successfully!");
                modalProductRef.current.hide();
                dispatch(thunkGetProduct({
                    page: page,
                    pageSize: step
                }));
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
                isLoading={isLoading}
                isEmpty={listProduct.length == 0}
                total={Math.ceil(total / step) || 1}
                page={page}
                onChangePage={page => dispatch(setPage(page))}
                step={step}
                onChangeStep={step => dispatch(setStep(step))}
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
                        {listProduct.map((item, index) => (
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