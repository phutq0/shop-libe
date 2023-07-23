import { RESULT_CODE } from "./baseApi";
import auth from "./Auth";
import product from "./Product"
import collection from "./Collection";
import cart from "./Cart";
import address from "./Address";
import order from "./Order";
import user from "./User"

const Api = {
    auth,
    product,
    collection,
    cart,
    address,
    order,
    user,
    RESULT_CODE
}

export default Api