import Utils from "../../share/Utils"

const className = {
    wrapper: `flex`,
    button: `
        h-10 w-10 mx-1 bg-gray-100 rounded flex items-center justify-center
        text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200
        hover:bg-black hover:text-white
    `,
    buttonActive: `kkk 
        h-10 w-10 mx-1 bg-black rounded flex items-center justify-center
        text-white text-sm cursor-pointer font-semibold
    `,
}

Utils.bind(className);

export default className