import Utils from "../../share/Utils"

const className = {
    wrapper: `
        fixed z-10 bottom-10 right-10 cursor-pointer
        flex items-center justify-center
        text-black text-2xl
        bg-gray-200 w-10 h-10 rounded-lg hover:bg-gray-100
    `,
    show: ` visible`,
    hidden: ` invisible`
}

Utils.bind(className);

export default className