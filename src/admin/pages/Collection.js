import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Table } from "admin/components"
import { modalCollectionRef } from "admin/components/Modal"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Api from "shop/api"
import Utils from "shop/share/Utils"
import { setPage, setStep, thunkGetCollection } from "shop/share/slices/Collection"

const Collection = () => {

    const dispatch = useDispatch();

    const { isLoading, step, page, total, listCollection } = useSelector(state => state.collection);
    const ref = useRef(false);

    const handleCreate = () => {
        modalCollectionRef.current.show({
            type: "CREATE",
            onConfirm: async (formData) => {
                const response = await Api.collection.createCollection(formData);
                Utils.showToastSuccess("Create product successfully!");
                modalCollectionRef.current.hide();
                dispatch(thunkGetCollection({
                    page: page,
                    pageSize: step
                }));
            }
        })
    }

    useEffect(() => {
        dispatch(thunkGetCollection({
            page: page,
            pageSize: step
        }));
    }, [step, page])

    return (
        <div className="p-4">
            <Table
                name={"Collection"}
                showButtonDelete={true}
                isLoading={isLoading}
                isEmpty={listCollection.length == 0}
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
                        <div className="flex-[1] text-center text-gray-400">NUMBER PRODUCT</div>
                        <div className="flex-[1] text-center text-gray-400">MANAGE</div>
                    </div>
                }
                body={
                    <div className="flex flex-col">
                        {listCollection.map((item, index) => (
                            <div
                                key={item.id ?? index}
                                className={"flex flex-row text-sm border-t border-b border-gray-100 font-semibold py-1 h-14 items-center hover:bg-gray-100 cursor-pointer " + (index % 2 == 0 ? "bg-gray-50" : "")}>
                                <div className="flex-[1] text-center">{item.id}</div>
                                <div className="flex-[3] line-clamp-2">{item.name}</div>
                                <div className="flex-[1] text-center">{item.number ?? 10}</div>
                                <div className="flex-[1] text-center text-lg text-gray-500">
                                    <FontAwesomeIcon
                                        className="hover:text-blue-600"
                                        icon={faGear} />
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className="ml-2 hover:text-red-600"
                                        onClick={async () => {
                                            await Api.collection.deleteCollection(item.id);
                                            Utils.showToastSuccess("Delete successfully!");
                                            dispatch(thunkGetCollection({
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

export default Collection