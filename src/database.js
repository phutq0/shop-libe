class Product {
    productId

}

/**
 * @returns {Product}
 */
const load = () => {
    const data = localStorage.getItem("database");
    if (data) {
        return JSON.parse(data);
    }
    return {
        account: {
            index: 0,
            data: []
        },
        product: {
            index: 0,
            data: []
        },
        collection: {
            index: 0,
            data: []
        },
        collectionProduct: {
            index: 0,
            data: []
        },
        variant: {
            index: 3,
            data: [
                { variantId: 1, name: "Color" },
                { variantId: 2, name: "Size" },
                { variantId: 3, name: "Material" },
                { variantId: 4, name: "Capacity" },
            ]
        },
        productVariant: {
            index: 0,
            data: []
        },
        model: {
            index: 0,
            data: []
        },
        color: {
            index: 0,
            data: []
        }
    }
}

const save = (database) => {
    localStorage.setItem("database", JSON.stringify(database));
}

const database = {
    load,
    save
}

export default database