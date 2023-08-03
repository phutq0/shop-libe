import axios from "axios";
import database from "database"
import _ from "lodash";

const account = {
    register: (data_) => {
        const data = database.load();
        const exist = data.account.data.filter(i => i.email == data_.email);
        if (exist.length > 0) {
            return {
                result: "fail",
                message: "Email had been existed!"
            }
        }
        const account = {
            ...data_,
            accountId: data.account.index + 1
        }
        data.account.data.push(account);
        data.account.index += 1;
        database.save(data);
        return {
            result: "success",
            account: account
        }
    },
    login: (data_) => {
        const data = database.load();
        const exist = data.account.data.filter(i => i.email == data_.email);
        if (exist.length == 0) {
            return {
                result: "fail",
                message: "Can not find this account!"
            }
        }
        const account = exist[0];
        if (data_.password == account.password) {
            return {
                result: "success",
                account: account
            }
        }
        else {
            return {
                result: "fail",
                message: "Wrong password"
            }
        }
    }

}

const collection = {
    getListCollection: (params) => {
        const page = params.page ?? 0;
        const limit = params.limit ?? 5;
        const query = params.query;
        const data = database.load();
        const _collections = query ? data.collection.data.filter(i => i.name.toLowerCase().includes(query.toLowerCase())) : data.collection.data;
        const collections = _collections.slice(page * limit, (page + 1) * limit)
        const collectionIds = collections.map(i => i.collectionId);
        const product = data.product.data;
        const collectionProduct = data.collectionProduct.data.filter(i => collectionIds.includes(i.collectionId));
        const collections_ = collections.map(item => {
            const productIds = collectionProduct.filter(i => i.collectionId == item.collectionId).map(i => i.productId);
            const products = product.filter(i => productIds.includes(i.productId))
            return {
                ...item,
                numberProduct: products.length,
                products: products.map(item => ({
                    ...item,
                    images: item.images.split("|")
                })),
            }
        })
        const total = _collections.length;
        return {
            result: "success",
            total: total,
            page: page,
            limit: limit,
            collections: collections_
        }
    },
    createCollection: (params) => {
        const data = database.load();
        const collection = {
            ...params,
            collectionId: data.collection.index + 1
        }
        data.collection.data.push(collection);
        data.collection.index += 1
        database.save(data);
        return {
            result: "success",
            collection
        }
    },
    updateCollection: (params) => {
        const data = database.load();
        const index = data.collection.data.findIndex(i => i.collectionId == params.collectionId);
        const oldProduct = data.collectionProduct.data.filter(i => i.collectionId == params.collectionId).map(item => item.productId);
        const newProduct = params.listProduct.filter(i => !oldProduct.includes(i.productId));
        const listProductIds = params.listProduct.map(item => item.productId);
        _.remove(data.collectionProduct.data, i => (!listProductIds.includes(i.productId) && i.collectionId == params.collectionId));
        for (const i of newProduct) {
            const collectionProductId = data.collectionProduct.index + 1;
            data.collectionProduct.data.push({
                collectionProductId: collectionProductId,
                collectionId: params.collectionId,
                productId: i.productId
            });
            data.collectionProduct.index += 1;
        }
        data.collection.data[index] = {
            name: params.name,
            color: params.color,
            description: params.description,
            collectionId: params.collectionId
        };
        database.save(data);
        return {
            result: "success",
            collection: data.collection.data[index]
        }
    },
    getCollection: (collectionId) => {
        const data = database.load();
        const exist = data.collection.data.filter(i => i.collectionId == collectionId);
        if (exist.length == 0) {
            return {
                result: "fail",
                collection: null
            }
        }
        const collection = exist[0];
        const products = data.collectionProduct.data.filter(i => i.collectionId == collectionId).map(item => getProduct(item.productId).product);
        collection.products = products;
        return {
            result: "success",
            collection: collection
        }
    }
}

const getProduct = (productId) => {
    const data = database.load();
    const product = data.product.data.filter(i => i.productId == productId)[0];
    if (!product) {
        return {
            result: "fail",
            product: null
        }
    }
    else {
        const variants = data.productVariant.data.filter(i => i.productId == productId).map(item => {
            return {
                variantId: item.variantId,
                name: item.name,
                data: item.value.split("|")
            }
        });
        const models = data.model.data.filter(i => i.productId == productId);
        product.variants = variants;
        product.models = {
            columns: models.length > 0 ? models[0].columns : "",
            data: models
        }
        product.images = product.images.split("|");
        product.price = Number(product.price);
        return {
            result: "success",
            product: product
        }
    }
}

const product = {
    createProduct: async (params) => {
        const data = database.load();
        const formData = new FormData();
        for (const i of params.images) {
            if (i.file) {
                formData.append("image", i.file);
            }
        }
        const result = await axios.post(
            "http://localhost:4000/api/v1/upload",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        )
        const productId = data.product.index + 1
        for (const i of params.variantList) {
            const productVariantId = data.productVariant.index + 1;
            data.productVariant.data.push({
                productVariantId: productVariantId,
                variantId: i.variantId,
                productId: productId,
                name: i.name,
                value: i.data.map(item => item.value).join("|")
            });
            data.productVariant.index += 1;
        }
        for (const i of params.options.data) {
            const modelId = data.model.index + 1
            data.model.data.push({
                modelId: modelId,
                productId: productId,
                name: i.name,
                number: i.number,
                sold: i.sold,
                remain: i.remain,
                columns: params.options.columns
            })
            data.model.index += 1;
        }
        const product = {
            productId: productId,
            name: params.name,
            price: params.price,
            images: result.data.links.join("|"),
            description: params.description
        }
        data.product.data.push(product)
        data.product.index += 1;
        database.save(data);
        return {
            result: "success",
            product: getProduct(productId).product
        }

    },
    deleteProduct: (productId) => {
        const data = database.load();
        _.remove(data.product.data, i => i.productId == productId);
        _.remove(data.collectionProduct.data, i => i.productId == productId);
        _.remove(data.productVariant.data, i => i.productId == productId);
        _.remove(data.model.data, i => i.productId == productId);
        database.save(data);
        return {
            result: "success"
        }
    },
    getProduct: getProduct,
    getListProduct: (params) => {
        const page = params.page ?? 0;
        const limit = params.limit ?? 5;
        const query = params.query;
        const data = database.load();
        const products = query ? data.product.data.filter(i => i.name.toLowerCase().includes(query.toLowerCase())) : data.product.data;
        const total = products.length;
        return {
            result: "success",
            total: total,
            page: page,
            limit: limit,
            products: products.slice(page * limit, (page + 1) * limit).map(item => getProduct(item.productId).product)
        }
    },
    getListColor: () => {
        const data = database.load();
        return {
            result: "success",
            colors: data.color.data
        }
    },
    getListVariant: () => {
        const data = database.load();
        return {
            result: "success",
            variants: data.variant.data
        }
    },
    updateProduct: async (params) => {
        console.log(params);
        const data = database.load();
        const index = data.product.data.findIndex(i => i.productId == params.productId);
        const formData = new FormData();
        for (const i of params.images) {
            if (i.file) {
                formData.append("image", i.file);
            }
        }
        const result = await axios.post(
            "http://localhost:4000/api/v1/upload",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        )

        const oldImages = data.product.data[index].images;
        const newImages = [...oldImages.split("|"), ...result.data.links];
        _.remove(newImages, i => params.removeImages.includes("http://localhost:4000" + i))

        data.product.data[index].images = newImages.join("|");
        data.product.data[index].name = params.name;
        data.product.data[index].price = params.price;
        data.product.data[index].description = params.description;


        const oldModel = params.options.data.filter(item => item.modelId);
        const newModel = params.options.data.filter(item => !item.modelId);


        for (const i of oldModel) {
            const index = data.model.data.findIndex(item => item.modelId == i.modelId);
            console.log(i, index);
            data.model.data[index] = {
                modelId: i.modelId,
                name: i.name,
                productId: params.productId,
                number: i.number,
                sold: i.sold,
                remain: i.remain,
                columns: params.options.columns
            }
        }
        for (const i of newModel) {
            const modelId = data.model.index + 1
            data.model.data.push({
                modelId: modelId,
                productId: params.productId,
                name: i.name,
                number: i.number,
                sold: i.sold,
                remain: i.remain,
                columns: params.options.columns
            })
            data.model.index += 1;
        }

        database.save(data);
        return {
            result: "success",
            product: getProduct(params.productId).product
        }
    }
}

const getModel = (modelId) => {
    const data = database.load();
    const model = data.model.data.filter(i => i.modelId == modelId)[0];
    model.product = getProduct(model.productId).product;
    return {
        result: "success",
        model: model
    }
}

const cart = {
    addToCart: (modelId, accountId, number) => {
        const data = database.load();
        const exist = data.cart.data.filter(i => (i.modelId == modelId && i.accountId == accountId));
        if (exist.length > 0) {
            const index = data.cart.data.findIndex(i => (i.modelId == modelId && i.accountId == accountId));
            const model = getModel(exist[0].modelId).model;
            if (exist[0].number + number > model.remain) {
                return {
                    result: "fail",
                    message: "Not enough product in stock!"
                }
            }
            data.cart.data[index].number += number;
            database.save(data);
            return {
                result: "success"
            }
        }
        else {
            const cartId = data.cart.index + 1;
            const cart = {
                cartId: cartId,
                accountId: accountId,
                modelId: modelId,
                number: number
            }
            data.cart.data.push(cart);
            data.cart.index += 1;
            database.save(data);
            return {
                result: "success"
            }
        }
    },
    popFromCart: (modelId, accountId, number) => {
        const data = database.load();
        const exist = data.cart.data.filter(i => (i.modelId == modelId && i.accountId == accountId))[0];
        const index = data.cart.data.findIndex(i => (i.modelId == modelId && i.accountId == accountId));
        if (exist.number - number <= 0) {
            _.remove(data.cart.data, i => i.cartId == exist.cartId);
        }
        else {
            data.cart.data[index].number -= number;
        }
        database.save(data);
        return {
            result: "success"
        }

    },
    getCart: (accountId) => {
        const data = database.load();
        const cart = data.cart.data.filter(i => i.accountId == accountId).map(item => ({
            ...item,
            model: getModel(item.modelId).model
        }));
        return {
            result: "success",
            cart: cart
        }
    }
}

const address = {
    getListAddress: (accountId = undefined) => {
        if (!accountId) {
            return {
                result: "success",
                addresses: []
            }
        }
        const data = database.load();
        const addresses = data.address.data.filter(i => i.accountId == accountId);
        return {
            result: "success",
            addresses: addresses
        }
    },
    createAddress: (params) => {
        const data = database.load();
        const addressId = data.address.index + 1;
        const address = {
            addressId: addressId,
            ...params
        };
        data.address.data.push(address);
        data.address.index += 1;
        database.save(data);
        return {
            result: "success",
            address: address
        }
    },
    updateAddress: (params) => {
        const data = database.load();
        const index = data.address.data.findIndex(i => i.addressId == params.addressId);
        data.address.data[index] = {
            ...params
        }
        database.save(data);
        return {
            result: "success",
            address: data.address.data[index]
        }
    },
    deleteAddress: (addressId) => {
        const data = database.load();
        _.remove(data.address.data, i => i.addressId == addressId);
        database.save(data);
        return {
            result: "success"
        }
    }
}

const getOrder = (orderId) => {

}

const order = {
    createOrder: (params) => {
        const data = database.load();
        const cart_ = cart.getCart(params.accountId).cart;
        const orderId = data.order.index + 1;
        const order = {
            orderId: orderId,
            accountId: params.account,
            total: params.total,
            ship: params.ship,
            shipPrice: params.shipPrice,
            status: "Pending",
            payment: params.payment
        }
        for (const i of cart_) {
            console.log(i);
            console.log({
                modelId: i.model.modelId,
                price: i.model.product.price,
                number: i.number
            });
        }
    }
}

const Api = {
    account,
    collection,
    product,
    cart,
    address,
    order
}

export default Api