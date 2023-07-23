import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "admin/components";
import { useEffect, useState } from "react";
import Api from "shop/api";

const User = () => {

    const [data, setData] = useState({
        total: 1,
        step: 5,
        page: 1,
        listUser: [],
    });

    const [isLoading, setIsLoading] = useState(false);

    const { listUser, page, step, total } = data;

    const loadData = async () => {
        setIsLoading(true);
        const response = await Api.user.getListUser({
            pageSize: step,
            page: page
        });
        data.total = response.data.total;
        data.listUser = response.data.items;
        setData({ ...data });
        setIsLoading(false);
    }

    const handleCreate = async () => {

    }

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className="p-4">
            <Table
                name={"User"}
                showButtonDelete={true}
                isLoading={isLoading}
                isEmpty={listUser.length == 0}
                total={Math.ceil(total / step) || 1}
                page={page}
                onChangePage={page => 1}
                step={step}
                onChangeStep={step => 1}
                onClickAdd={handleCreate}
                header={
                    <div className="flex flex-row text-sm font-semibold py-2 items-center">
                        <div className="flex-[1] text-center text-gray-400">ID</div>
                        <div className="flex-[1] text-center text-gray-400">FIRST NAME</div>
                        <div className="flex-[1] text-center text-gray-400">LAST NAME</div>
                        <div className="flex-[1] text-center text-gray-400">EMAIL</div>
                        <div className="flex-[1] text-center text-gray-400">GENDER</div>
                        <div className="flex-[1] text-center text-gray-400">BIRTHDAY</div>
                        <div className="flex-[1] text-center text-gray-400">ROLE</div>
                        <div className="flex-[1] text-center text-gray-400">MANAGER</div>
                    </div>
                }
                body={
                    <div className="flex flex-col">
                        {listUser.map((item, index) => (
                            <div
                                key={item.id ?? index}
                                className={"flex flex-row text-sm border-t border-b border-gray-100 font-semibold py-1 h-14 items-center hover:bg-gray-100 cursor-pointer " + (index % 2 == 0 ? "bg-gray-50" : "")}>
                                <div className="flex-[1] text-center font-semibold">{item.id}</div>
                                <div className="flex-[1] text-center font-semibold">{item.firstName}</div>
                                <div className="flex-[1] text-center font-semibold">{item.lastName}</div>
                                <div className="flex-[1] text-center font-semibold">{item.email}</div>
                                <div className="flex-[1] text-center font-semibold">{item.gender.toUpperCase()}</div>
                                <div className="flex-[1] text-center font-semibold">{formatDate(new Date(item.dateOfBirth))}</div>
                                <div className="flex-[1] text-center font-semibold">{item.role == 1 ? "ADMIN" : "USER"}</div>
                                <div className="flex-[1] text-center font-semibold text-lg">
                                    <FontAwesomeIcon
                                        className="hover:text-blue-600"
                                        icon={faGear}
                                        onClick={() => { }} />
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className="ml-2 hover:text-red-600"
                                        onClick={() => { }} />
                                </div>
                            </div>
                        ))}
                    </div>
                }
            />
        </div>
    )
}

export default User