import Utils from "../../share/Utils";

const className = {
    wrapper: ``,
    overlay: `
        fixed top-0 bottom-0 left-0 right-0 z-[1]
        bg-opacity-30 bg-black flex flex-grow
    `,
    content: `
        fixed top-0 bottom-0 right-0
        w-full h-full md:max-w-lg bg-white
        flex flex-col px-4 md:px-12 py-3 z-[2]
    `,
    iconClose: `absolute top-0 right-4 cursor-pointer text-xl hover:opacity-50 p-4 z-[1]`,
    title: `text-center mt-8 font-bold`,
    data: `flex-1 flex flex-col py-2 overflow-y-scroll overflow-x-hidden`,
    item: `
        flex flex-row h-[144px] items-center py-2 mr-1
        border-t border-gray-400 relative
    `,
    image: `border rounded-sm h-full object-contain`,
    infor: `flex flex-1 pl-4 flex-col`,
    name: `font-semibold text-sm line-clamp-1`,
    att: `mt-2 text-xs text-gray-400 font-semibold`,
    number: `flex flex-row h-7 mt-2`,
    buttonAdd: `
        h-7 w-7 border rounded-sm flex items-center justify-center
        cursor-pointer bg-gray-200 hover:opacity-70 
    `,
    count: `h-7 w-7 flex items-center justify-center font-semibold text-xs`,
    price: `mt-2 text-sm font-semibold`,
    clear: `absolute top-2 right-2 text-lg hover:opacity-50 cursor-pointer`,
    bottom: `mt-2`,
    total: `pt-4 flex justify-between border-t-2 border-t-black `,
    row: `flex mt-3`,
    button: `
        h-12 flex-1 mx-1 flex items-center justify-center
        cursor-pointer border rounded-sm border-gray-500
        text-sm font-semibold hover:bg-black hover:text-white
    `,
    notFound: "text-center font-semibold pt-10"
}

Utils.bind(className);

export default className