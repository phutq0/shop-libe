import { useState } from "react";
// import className from "./className"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { products } from "../../share/data";
import ListProduct from "../../components/ListProduct";
import SelectSort from "../../components/SelectSort";
import Pagination from "../../components/Pagination";
import Utils from "../../share/Utils";

const data = [
    {
        id: 0,
        value: 1,
        display: "Price: DESC",
    },
    {
        id: 1,
        value: 1,
        display: "Price: ASC",
    },
    {
        id: 2,
        value: 1,
        display: "Name: DESC",
    },
    {
        id: 3,
        value: 1,
        display: "Name: ASC",
    },
    {
        id: 4,
        value: 1,
        display: "Public: DESC",
    },
    {
        id: 5,
        value: 1,
        display: "Public: ASC",
    },
]

const show_ = [
    {
        id: 0,
        value: 10,
        display: "Show 10 items"
    },
    {
        id: 1,
        value: 20,
        display: "Show 20 items"
    },
    {
        id: 2,
        value: 50,
        display: "Show 50 items"
    },
]


const Search = () => {

    const [searchValue, setSearchValue] = useState("");
    const [sort, setSort] = useState({
        display: "Sort by"
    });
    const [numberShow, setNumberShow] = useState({
        ...show_[0]
    });
    const [page, setPage] = useState(1);

    return (
        <div className={className.container}>
            <div className={className.title}>SEARCH</div>
            <div className={className.border}>
                <input
                    placeholder={"Enter something..."}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    className={className.input} />
                {searchValue.length > 0 && (
                    <FontAwesomeIcon
                        onClick={() => setSearchValue("")}
                        className={className.clear}
                        icon={faCircleXmark} />
                )}

            </div>
            <div className={className.top}>
                <div className={className.right}>
                    <div className={className.found}>
                        {`Found ${30} items`}
                    </div>
                </div>
                <div className={className.left}>
                    <SelectSort
                        classNames={"mr-3"}
                        data={show_}
                        onSelected={item => setNumberShow(item)}
                        currentValue={numberShow.display} />
                    <SelectSort
                        classNames={""}
                        data={data}
                        onSelected={item => setSort(item)}
                        currentValue={sort.display} />
                </div>
            </div>
            <div className={className.data}>
                <ListProduct
                    data={products} />
            </div>
            <div className={className.page}>
                <Pagination
                    total={100}
                    page={page}
                    setPage={setPage} />
            </div>
        </div>
    );
}

export default Search

const className = {
    container: `w-full min-h-[32rem] flex flex-col items-center px-4 md:px-8 xl:px-12`,
    title: `text-center text-2xl font-bold py-6`,
    border: `h-12 flex relative w-full max-w-md`,
    input: `
        flex-1 outline-none bg-gray-100 focus-within:bg-white 
        rounded border px-4 focus-within:border-gray-400 text-sm font-semibold
    `,
    clear: `absolute top-4 right-2 cursor-pointer text-gray-500 hover:opacity-70`,
    top: `flex w-full mt-6 justify-between items-center`,
    found: `text-sm font-semibold`,
    left: `flex`,
    data: `mt-2 -px-6`,
    page: `flex items-center mt-6 mb-12`
}

Utils.bind(className);