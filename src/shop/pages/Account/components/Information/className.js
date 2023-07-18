import Utils from "../../../../share/Utils"

const className = {
    wrapper: `flex flex-1 flex-col items-center px-6 pt-4 md:pt-0`,
    top: `w-full flex flex-col items-center`,
    avatar: `
        w-32 h-32 border-2 border-gray-300 
        rounded-full object-cover cursor-pointer
    `,
    buttonSelect: `
        px-5 py-2 mt-3 mb-6 border border-gray-400 rounded-sm cursor-pointer
        flex items-center justify-center text-sm font-semibold
        hover:bg-black hover:text-white
    `,
    row: `w-full flex items-center mb-2`,
    label: `w-24 text-sm font-semibold`,
    border: `h-12 flex flex-1 bg-gray-100 rounded relative`,
    input: `
        outline-none bg-gray-100 flex-1 pl-4 pr-8 text-sm
        focus-within:bg-white focus-within:border rounded
    `,
    input2: `
        outline-none bg-gray-100 flex-1 px-4 text-sm
        focus-within:bg-white focus-within:border rounded
    `,
    clear: `absolute top-4 right-3 cursor-pointer text-gray-600 hover:opacity-70`,
    clear2: `absolute top-4 right-9 cursor-pointer text-gray-600 hover:opacity-70`,
    row2: `w-full flex mb-2 mt-1`,
    border2: `flex flex-1 flex-wrap flex-row`,
    select: `flex flex-row items-center cursor-pointer mr-3 md:mr-5 mb-2`,
    checkbox: `h-[18px] w-[18px] accent-black cursor-pointer`,
    label2: `font-bold ml-2 text-sm`,
    buttonSave: `
        mt-2 mb-4 px-5 py-2 text-sm font-semibold cursor-pointer
        border border-gray-300 rounder-sm hover:bg-black hover:text-white    
    `
}

Utils.bind(className);

export default className