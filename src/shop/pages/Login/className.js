import Utils from "../../share/Utils";

const className = {
    container: `w-full flex flex-col px-8 mb-8 md:flex-row md:min-h-[32rem]`,
    left: `flex justify-center items-center min-h-[8rem] md:flex-1`,
    login: `text-4xl font-bold`,
    right: `
        flex flex-col md:w-1/2
        md:px-20 md:py-24 md:border-l md:border-l-gray-200
    `,
    border: `h-12 mt-6 flex bg-gray-100 rounded relative`,
    input: `
        outline-none bg-gray-100 flex-1 px-4
        focus-within:bg-white focus-within:border
    `,
    clear: `absolute top-4 right-2 cursor-pointer text-gray-600 hover:opacity-70`,
    action: `flex flex-row mt-6 items-center`,
    buttonLogin: `
        py-3 px-5 bg-black rounded text-white border font-semibold
        cursor-pointer hover:bg-white hover:text-black
    `,
    buttonLoginDisable: `
        py-3 px-5 bg-black rounded text-white border font-semibold
        cursor-default opacity-60
    `,
    action2: `flex flex-col ml-4`,
    forgot: `hover:opacity-50 cursor-pointer`,
    row: `flex flex-row text-gray-500`,
    signup: `ml-1 text-black hover:opacity-50 cursor-pointer`
}

Utils.bind(className);

export default className