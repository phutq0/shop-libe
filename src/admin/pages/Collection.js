import { Table } from "admin/components"

const Collection = () => {


    return (
        <div className="p-4">
            <Table
                header={
                    <div className="flex flex-row bg-red-50 text-sm font-semibold">
                        <div className="flex-[1] text-center">{"ID"}</div>
                        <div className="flex-[3] text-center">{"Name"}</div>
                        <div className="flex-[1] text-center">{"Number Product"}</div>
                    </div>
                } />
        </div>
    )
}

export default Collection