import { useParams } from "react-router-dom";
import className from "./className"
import SelectSort from "../../components/SelectSort";
import { useEffect, useState } from "react";
import ListProduct from "../../components/ListProduct";
import { products } from "../../share/data";
import Pagination from "shop/components/Pagination/Pagination";
import Api from "api2";

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
    const [collectionId, setCollectionId] = useState(() => {
        const tmp = collection_?.split("-") ?? [];
        try {
            const x = Number(tmp.at(-1));
            return x;
        } catch (error) {
            return 1;
        }
    });
    const [collection, setCollection] = useState({
        name: "Collection",
        description: "",
        color: undefined,
        products: []
    })
    const [sort, setSort] = useState({
        display: "Sắp xếp theo"
    });

    const loadData = async () => {
        const result = Api.collection.getCollection(collectionId);
        setCollection(result.collection);
    }

    useEffect(() => {
        const tmp = collection_?.split("-") ?? [];
        try {
            const x = Number(tmp.at(-1));
            setCollectionId(x);
        } catch (error) {
            setCollectionId(1);
        }
    }, [collection_])

    useEffect(() => {
        loadData();
    }, [collectionId]);


    return (
        <div className={className.container}>
            <div className={className.header} style={{ backgroundColor: collection.color }}>
                <div className={className.name}>{collection.name}</div>
                <div className="px-3 xl:max-w-lg text-sm mt-3 xl:mt-0">{collection.description}</div>
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
                    data={collection.products} />
                <Pagination
                    classNames="mt-6"
                    total={1}
                    page={1}
                    setPage={e => 1}
                />
            </div>
        </div>
    )
}

export default Collection