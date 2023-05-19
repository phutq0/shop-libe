import Utils from "../../share/Utils"

const className = {
    container: `w-full flex flex-col px-4`,
    path: `flex py-2`,
    collection: `mr-2 font-semibold`,
    product: `ml-2 w-`,
    content: `flex md:flex-row flex-col`,
    listImage: `w-full md:w-7/12`,
    image: `w-full mb-4`,
    right: `w-full md:w-5/12`,
    infor: `w-full sticky top-12 flex flex-col md:px-6`,
    name: `font-semibold text-xl`,
    price: `mt-3 py-3 text-lg font-bold border-y border-y-gray-200`,
    colors: `flex border-b border-b-gray-200 py-3 flex-wrap`,
    itemColor: `flex flex-col items-center w-12 cursor-pointer`,
    color: `w-10 h-10 border rounded-full border-gray-300 flex overflow-hidden p-1`,
    colorSelected: `w-10 h-10 border rounded-full border-black flex overflow-hidden p-1`,
    colorName: `mb-1 text-sm`,
    colorHex: `flex-1 rounded-full`,
    material: `flex border-b border-b-gray-200 py-3 flex-wrap`,
    materialItem: `
        h-10 px-4 mr-2 cursor-pointer flex items-center justify-center rounded-sm 
        text-xs border border-gray-300
    `,
    materialSelected: `
        h-10 px-4 mr-2 flex items-center justify-center rounded-sm
        text-xs font-semibold border border-black cursor-pointer
    `,
    size: `flex border-b border-b-gray-200 py-3 flex-wrap`,
    sizeItem: `
        h-10 w-10 mr-2 flex items-center justify-center rounded-sm
        text-xs border border-gray-300 cursor-pointer
    `,
    sizeSelected: `
        h-10 w-10 mr-2 flex items-center justify-center rounded-sm
        text-xs font-semibold border border-black cursor-pointer
    `,
    number: `mt-4 flex h-9 overflow-hidden item-center`,
    numberButton: `
        w-9 h-9 flex items-center justify-center 
        bg-blue-100 cursor-pointer font-semibold hover:opacity-80
    `,
    inputNumber: `outline-none w-20 border-y text-center font-bold`,
    buttonAdd: `
        flex mt-3 h-12 w-60 items-center justify-center cursor-pointer
        font-bold border text-sm border-black hover:bg-black hover:text-white
    `,
}

Utils.bind(className);

export default className