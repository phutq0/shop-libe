class Product {
    account
    product
    collection
    collectionProduct
    variant
    productVariant
    model
    cart
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
            index: 4,
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
            index: 14,
            data: [
                { colorId: 1, name: "Red", hex: "#d0312d" },
                { colorId: 2, name: "Navy", hex: "#192841" },
                { colorId: 3, name: "Blue", hex: "#1167b1" },
                { colorId: 4, name: "White", hex: "#d0312d" },
                { colorId: 5, name: "Yellow", hex: "#fee12b" },
                { colorId: 6, name: "Black", hex: "#000000" },
                { colorId: 7, name: "Beige", hex: "#e8dcca" },
                { colorId: 8, name: "Burnt Orange", hex: "#cc5500" },
                { colorId: 9, name: "Coral", hex: "#ff7f4f" },
                { colorId: 10, name: "Brown", hex: "#654321" },
                { colorId: 11, name: "Grey", hex: "#aaaaaa" },
                { colorId: 12, name: "Pink", hex: "#ffc0cb" },
                { colorId: 13, name: "Light Blue", hex: "#c4ffff" },
                { colorId: 14, name: "Mint", hex: "#99edc3" },
            ]
        },
        cart: {
            index: 0,
            data: []
        },
        address: {
            index: 0,
            data: []
        },
        order: {
            index: 0,
            data: []
        },
        orderProduct: {
            index: 0,
            data: []
        }
    }
}

const save = (database) => {
    localStorage.setItem("database", JSON.stringify(database, null, 4));
}

const database = {
    load,
    save
}

export default database