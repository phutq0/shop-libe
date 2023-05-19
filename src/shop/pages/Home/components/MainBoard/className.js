import Utils from "../../../../share/Utils"

const className = {
    wrapper: `flex flex-col md:flex-row`,
    div1: `relative md:flex md:flex-1`,
    div2: `flex-col md:flex md:flex-1`,
    div3: `relative`,
    div4: `flex`,
    img2: `w-full`,
    button: `
        absolute px-4 py-2 text-sm rounded-full border border-black 
        md:px-7 md:py-2
        lg:text-xl font-semibold cursor-pointer text-gray-600 hover:text-black
        hover:bg-white bottom-6 left-6
    `
}

Utils.bind(className);

export default className