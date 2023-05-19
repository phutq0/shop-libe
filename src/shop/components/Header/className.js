import Utils from "../../share/Utils";

const className = {
    wrapper: `
        w-full flex z-[1] flex-row h-[100px] bg-white
         items-center px-6 border-b border-b-gray-200`,
    left: `flex items-center flex-1`,
    btnMore: `text-2xl hover:opacity-50 cursor-pointer md:hidden`,
    btnShop: `
        px-[11px] py-[7px] rounded-full border border-black cursor-pointer hidden
        hover:bg-black hover:text-white md:block font-medium
    `,
    btnJoin: `w-28 ml-6 hover:opacity-50 cursor-pointer hidden md:block font-medium`,
    center: `flex-[3] flex justify-center`,
    logo: `text-5xl font-semibold cursor-pointer`,
    right: `flex-1 flex flex-row-reverse`,
    search: `text-2xl cursor-pointer hover:opacity-50`,
    account: `text-2xl ml-2 cursor-pointer hover:opacity-50`,
    cart: `text-2xl ml-2 cursor-pointer hover:opacity-50`
}

Utils.bind(className);

export default className