import Utils from "../../share/Utils"

const className = {
    container: `w-full min-h-[32rem] flex flex-col items-center px-4 md:px-8 xl:px-12`,
    title: `text-center text-2xl font-bold py-6`,
    border: `h-12 flex relative w-full max-w-md`,
    input: `
        flex-1 outline-none bg-gray-100 focus-within:bg-white 
        rounded border px-4 focus-within:border-gray-400 text-sm font-semibold
    `,
    clear: `absolute top-4 right-2 cursor-pointer text-gray-500 hover:opacity-70`,
    top: `flex w-full mt-6 justify-between items-center`,
    found: `text-sm font-semibold`,
    left: `flex`,
    data: `mt-2 -px-6`,
    page: `flex items-center mt-6 mb-12`
}

Utils.bind(className);

export default className