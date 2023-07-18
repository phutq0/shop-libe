import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Table } from "admin/components"
import { useState } from "react"

const Collection = () => {

    const list = [
        { id: 1, name: "Quần què", number: 20 },
        { id: 2, name: "Áo phao", number: 20 },
        { id: 3, name: "Áo sơ mi", number: 20 },
        { id: 4, name: "Nón lá", number: 20 },
        { id: 3, name: "Áo sơ mi", number: 20 },
        { id: 4, name: "Nón lá", number: 20 },
        { id: 3, name: "Áo sơ mi", number: 20 },
        { id: 4, name: "Nón lá", number: 20 },
    ]

    const [step, setStep] = useState(5);
    const [page, setPage] = useState(1);


    return (
        <div className="p-4">
            <Table
                name={"Collection"}
                showButtonDelete={true}
                isLoading={false}
                isEmpty={list.length == 0}
                total={10}
                page={page}
                onChangePage={page => setPage(page)}
                step={step}
                onChangeStep={step => setStep(step)}
                header={
                    <div className="flex flex-row bg-red-50 text-sm font-semibold py-2 items-center">
                        <div className="flex-[1] text-center">{"ID"}</div>
                        <div className="flex-[3] text-center">{"Name"}</div>
                        <div className="flex-[1] text-center">{"Number Product"}</div>
                        <div className="flex-[1] text-center">Actions</div>
                    </div>
                }
                body={
                    <div className="flex flex-col">
                        {list.map((item, index) => (
                            <div className={"flex flex-row text-sm border-t border-b border-gray-100 font-semibold py-1 h-14 items-center hover:bg-gray-100 cursor-pointer " + (index % 2 == 0 ? "bg-gray-50" : "")}>
                                <div className="flex-[1] text-center">{item.id}</div>
                                <div className="flex-[3] line-clamp-2">{item.name}</div>
                                <div className="flex-[1] text-center">{item.number}</div>
                                <div className="flex-[1] text-center text-lg text-gray-500">
                                    <FontAwesomeIcon
                                        className="hover:text-blue-600"
                                        icon={faGear} />
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className="ml-2 hover:text-red-600" />
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