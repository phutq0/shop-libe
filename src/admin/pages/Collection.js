import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Table } from "admin/components"
import { modalCollectionRef } from "admin/components/Modal"
import Api from "api2"
import { useEffect, useRef, useState } from "react"
import Utils from "shop/share/Utils"

const Collection = () => {

    const [data, setData] = useState({
        collections: [],
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
        loadData();
    }, [page, step]);

    const handleCreate = () => {
        modalCollectionRef.current.show({
            type: "CREATE",
            onConfirm: async (params) => {
                const result = Api.collection.createCollection(params);
                console.log(result);
                Utils.showToastSuccess("Create successfully!");
                modalCollectionRef.current.hide();
                loadData();
            }
        })
    }

    const handleUpdate = (item) => {
        modalCollectionRef.current.show({
            collection: item,
            type: "UPDATE",
            buttonRight: "Save",
            onConfirm: async (params) => {
                console.log(params);
                const result = Api.collection.updateCollection(params);
                console.log(result);
                Utils.showToastSuccess("Update successfully!");
                modalCollectionRef.current.hide();
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
                isEmpty={data.collections.length == 0}
                total={Math.ceil(data.total / step) || 1}
                page={page + 1}
                onChangePage={page => setPage(page - 1)}
                step={step}
                onChangeStep={step => setStep(step)}
                onClickAdd={handleCreate}
                header={
                    <div className="flex flex-row text-sm font-semibold py-2 items-center">
                        <div className="flex-[1] text-center text-gray-400">ID</div>
                        <div className="flex-[2] text-center text-gray-400">NAME</div>
                        <div className="flex-[2] text-center text-gray-400">NAME</div>
                        <div className="flex-[0.5] text-center text-gray-400">Color</div>
                        <div className="flex-[1] text-center text-gray-400">NUMBER PRODUCT</div>
                        <div className="flex-[1] text-center text-gray-400">MANAGE</div>
                    </div>
                }
                body={
                    <div className="flex flex-col">
                        {data.collections.map((item, index) => (
                            <div
                                key={item.collectionId ?? index}
                                className={"flex flex-row text-sm border-t border-b border-gray-100 font-semibold py-1 h-14 items-center hover:bg-gray-100 cursor-pointer " + (index % 2 == 0 ? "bg-gray-50" : "")}>
                                <div
                                    className="flex-[1] text-center"
                                    onClick={() => handleUpdate(item)}>
                                    {item.collectionId}
                                </div>
                                <div
                                    className="flex-[2] text-center line-clamp-2"
                                    onClick={() => handleUpdate(item)}>
                                    {item.name}
                                </div>
                                <div
                                    className="flex-[2] text-center line-clamp-2"
                                    onClick={() => handleUpdate(item)}>
                                    {item.description}
                                </div>
                                <div
                                    className="flex-[0.5] h-full flex items-center justify-center p-2"
                                    onClick={() => handleUpdate(item)}>
                                    <div className="w-full h-full border rounded" style={{ backgroundColor: item.color }}>
                                    </div>
                                </div>
                                <div
                                    className="flex-[1] text-center"
                                    onClick={() => handleUpdate(item)}>
                                    {item.number ?? 10}
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