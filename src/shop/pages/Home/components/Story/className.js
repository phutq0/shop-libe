import Utils from "../../../../share/Utils"

const className = {
    wrapper: `w-full flex flex-col`,
    itemEven: `w-full flex flex-col md:flex-row`,
    itemOdd: `w-full flex flex-col md:flex-row-reverse`,
    image: `w-full md:w-1/2`,
    content: `flex flex-col md:w-1/2 items-center justify-center py-5 px-6`,
    title: `
        text-2xl md:text-3xl font-bold line-clamp-1
        flex items-center justify-center text-center`,
    tag: `text-sm`,
    button: `
        px-4 py-2 mt-4 text-sm cursor-pointer 
        rounded-full border border-black 
        hover:bg-black hover:text-white
    `
}

Utils.bind(className);

export default className

