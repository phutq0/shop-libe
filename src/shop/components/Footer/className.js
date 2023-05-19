import Utils from "../../share/Utils";

const className = {
    wrapper: `w-full flex flex-col`,
    contact: `
        flex flex-col px-7
        md:flex-row md:px-12
    `,
    subscribe: `flex-1`,
    title: `text-lg`,
    content: `mt-2`,
    email: `
        flex-1 flex flex-col items-center mt-4
        md:flex-row
    `,
    border: `
        border-b-[1px] border-black w-4/5 flex justify-center pb-2 px-4
        md:ml-4 xl:ml-8
    `,
    input: `outline-none flex-1`,
    buttonSubmit: `
        py-2 px-[18px] mt-4 border rounded-full flex items-center justify-center
        border-black cursor-pointer hover:text-white hover:bg-black
        md: ml-3
    `,
    infor: `px-8 mt-8 md:flex md:flex-row md:flex-wrap`,
    block: `
        w-full mb-6 flex flex-col
        md:w-1/2 md:px-4
        xl:w-1/4
    `,
    inforTitle: `border-b border-black text-xl pb-3 mb-3`,
    inforItem: `text-sm hover:opacity-50 my-1 cursor-pointer`,
    link: `flex mt-2 items-center`,
    icon: `mr-4 text-2xl cursor-pointer hover:opacity-50`
}

Utils.bind(className);

export default className