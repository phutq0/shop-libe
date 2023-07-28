import database from "database"

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
            id: data.account.index + 1
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
        const data = database.load();
        const total = data.collection.data.length;
        return {
            result: "success",
            total: total,
            page: page,
            limit: limit,
            collections: data.collection.data
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
        data.collection.data[index] = { ...params };
        database.save(data);
        return {
            result: "success",
            collection: data.collection.data[index]
        }
    }
}

const product = {
    createProduct: (params) => {

    },
    getProduct: (id) => {

    },
    getListProduct: () => {

    }
}

const Api = {
    account,
    collection,
    product
}

export default Api