import { useParams } from "react-router-dom";
import className from "./className"
import SelectSort from "../../components/SelectSort";
import { useEffect, useState } from "react";
import ListProduct from "../../components/ListProduct";
import { products } from "../../share/data";
import Pagination from "shop/components/Pagination/Pagination";
import Api from "shop/api";

const datas = [
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

const Collection = () => {

    const { collection: collection_ } = useParams();
    const [sort, setSort] = useState({
        display: "Sắp xếp theo"
    });

    const [products, setProducts] = useState([]);

    const loadData = async () => {
        const response = await Api.product.getListProduct({
            page: 1,
            pageSize: 100
        });
        console.log(response);
        setProducts(response.data.productList.map(item => ({
            ...item,
            images: item.imageProduct.map(item => item.imageLink)
        })));
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div className={className.container}>
            <div className={className.header}>
                <div className={className.name}>{"ALL"}</div>
            </div>
            <div className={className.top}>
                <div className={className.collectionName}>ALL</div>
                <SelectSort
                    classNames={1}
                    data={datas}
                    onSelected={item => setSort(item)}
                    currentValue={sort.display} />
            </div>
            <div className={className.content}>
                <ListProduct
                    data={products} />
                <Pagination
                    classNames="mt-6"
                    total={1}
                    page={1}
                />
            </div>
        </div>
    )
}

export default Collection