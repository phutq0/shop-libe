

const load = () => {
    const data = localStorage.getItem("database");
    if (data) {
        return JSON.parse(data);
    }
    else {
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
            }
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