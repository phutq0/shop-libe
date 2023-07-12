import _ from "lodash";
import Loading, { loadingRef } from "./components/Loading";
import { toast } from "react-toastify"
import Toast from "./components/Toast";

/**
 * Format className
 * @function example: ` mt-5\t        px-2\n   text-xl` --> `mt-5 px-2 text-xl`
 * @param {Object} className 
 */
const bind = className => {
    _.entries(className).forEach(([key, value]) => {
        const tmp = value.replace("\t", " ")
            .replace("\n", "")
            .replace("\n", "")
            .replace("\n", "")
            .replace("\n", "")
            .replace("\n", " ")
            .replace("\t", " ")
            .replace("\t", " ")
            .replace("\t", " ")
            .replace("\t", " ")
            .replace("\t", " ")
            .replace("\t", " ")
            .replace("      ", " ")
            .replace("      ", " ")
            .replace("     ", " ")
            .replace("     ", " ")
            .replace("    ", " ")
            .replace("    ", " ")
            .replace("   ", " ")
            .replace("   ", " ")
            .replace("  ", " ")
            .replace("  ", " ")
            .replace("  ", " ");
        if (tmp.startsWith(" ")) {
            className[key] = tmp.slice(1);
        }
        else {
            className[key] = tmp;
        }
    });
}

const Utils = {
    global: {
        accessToken: "",
        nextPath: null
    },
    bind,
    wait: (ms) => new Promise(e => setTimeout(e, ms)),
    showLoading: () => {
        loadingRef.current.hide();
        loadingRef.current.show();
    },
    hideLoading: () => {
        loadingRef.current.hide();
    },
    showToastSuccess: (message) => {
        toast.success(message);
    },
    showToastError: (message) => {
        if (_.isArray(message)) {
            toast.error(
                <>
                    {message.map((item, index) =>
                        <span key={index}>{item}<br /></span>
                    )}
                </>
            )
        }
        else {
            toast.error(message)
        }
    }
}

const UtilComponents = () => {

    return (
        <>
            <Toast />
            <Loading />
        </>
    )
}

export default Utils
export {
    UtilComponents,
}