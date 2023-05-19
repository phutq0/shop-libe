import Utils from "../../../../share/Utils"

const className = {
    wrapper: `w-full relative mb-8 mt-8 overflow-x-hidden`,
    item: `flex flex-col items-center px-2 cursor-pointer`,
    image: `w-full lg`,
    title: `text-sm text-center mt-1 px-4`,
    next: `
        flex absolute -top-12 right-9 w-14 h-14 bg-white opacity-80 
        rounded-full text-gray-400 items-center justify-center hover:opacity-50
    `,
    prev: `
        flex absolute -top-12 left-9 w-14 h-14 bg-white opacity-80
        rounded-full text-gray-400 items-center justify-center hover:opacity-50
    `
}

Utils.bind(className);

export default className