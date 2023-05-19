import Utils from "../../share/Utils";

const className = {
    wrapper: ``,
    content: `bg-white py-1 rounded shadow-md w-36 -mt-2`,
    item: `
        h-8 py-[2px] text-sm cursor-pointer
        flex items-center px-2
        hover:bg-gray-200 hover:opacity-70 hover:font-bold
        `,
    button: `
        w-36 h-8 border rounded relative px-2 flex flex-row items-center
        font-semibold text-sm cursor-pointer hover:opacity-70 border-gray-300
    `,
    icon: `absolute top-2 right-2 hover:opacity-70`
}

Utils.bind(className);

export default className