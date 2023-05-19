const className = {
    container: `w-full flex flex-col min-h-[32rem] px-3 md:px-10 xl:px-20`,
    title: `text-3xl font-semibold text-center py-6`,
    description: `text-center`,
    content: `flex flex-col mt-4 `,
    item: `relative h-44 flex py-3 border-t border-gray-400`,
    clear: `absolute top-2 right-2 text-lg hover:opacity-50 cursor-pointer`,
    image: `h-full border rounded-sm`,
    infor: `flex flex-1 pl-6 flex-col`,
    name: `font-semibold text-sm line-clamp-1`,
    att: `mt-2 text-xs text-gray-400 font-semibold`,
    number: `flex flex-row h-7 mt-2`,
    buttonAdd: `
        h-7 w-7 border rounded-sm flex items-center justify-center
        cursor-pointer bg-gray-200 hover:opacity-70 
    `,
    count: `h-7 w-7 flex items-center justify-center font-semibold text-xs`,
    price: `mt-2 text-sm font-semibold`,
    sumPrice: `text-sm font-semibold flex items-center`,
    total: `py-4 text-2xl font-semibold flex justify-between border-t-2 border-t-black`,
    bottom: `flex justify-end mb-20`,
    button: `
        flex item-center px-6 py-4 ml-3 justify-center text-sm font-semibold
        cursor-pointer border rounded-sm border-gray-300 hover:bg-black hover:text-white
    `
}

export default className