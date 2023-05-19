import Utils from "../../share/Utils";

const className = {
    wrapper: ``,
    overlay: `
        fixed top-0 bottom-0 left-0 right-0 z-[1]
        bg-opacity-30 bg-black flex flex-grow
    `,
    content: `
        fixed top-0 bottom-0 left-0
        w-full h-full md:max-w-sm bg-white
        flex flex-col pl-8 pt-3 z-[2]
    `,
    iconClose: `absolute top-0 right-4 cursor-pointer text-xl hover:opacity-50 p-4 z-[1]`,
    item: `cursor-pointer hover:opacity-50 mt-4 flex flex-row`,
    shop: `mt-4 flex flex-row cursor-pointer items-center`,
    title: `hover:opacity-50`,
    iconDown: `ml-2 text-xl hover:opacity-50`,
    shopWrapper: `flex flex-col pl-8 overflow-hidden`,
    item1: `cursor-pointer hover:opacity-50 mt-2 flex flex-row text-sm`,
    tops: `mt-2 flex flex-row cursor-pointer items-center text-sm`,
    topWrapper: `flex flex-col pl-8 overflow-hidden`,
}

Utils.bind(className);

export default className