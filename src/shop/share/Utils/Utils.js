import _ from "lodash";

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

export { bind }