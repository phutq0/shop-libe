import Utils from "../../share/Utils";

const className = {
    wrapper: ``,
    overlay: `
        fixed top-0 bottom-0 left-0 right-0 z-[1]
        bg-opacity-30 bg-black flex flex-grow
    `,
    content: `
        fixed top-0 bottom-0 right-0
        w-full h-full md:max-w-lg bg-white
        flex flex-col px-12 pt-3 z-[2]
    `,
    iconClose: `absolute top-0 right-4 cursor-pointer text-xl hover:opacity-50 p-4 z-[1]`,
    title: `text-center mt-8 font-bold`,
    border: `h-12 flex mt-6 relative`,
    input: `
        flex-1 outline-none bg-gray-100 focus-within:bg-white 
        rounded border px-4 focus-within:border-gray-400
    `,
    clear: `absolute top-4 right-2 cursor-pointer text-gray-600 hover:opacity-70`,
    data: `flex flex-col max-h-[30rem]`,
    notFound: `flex items-center justify-center mt-4 text-sm`,
    item: `
        flex h-24 py-2 border-b border-b-gray-200 items-center
        cursor-pointer hover:opacity-70
    `,
    right: `flex-1 flex flex-col`,
    name: `mb-1`,
    price: `text-sm`,
    image: `w-10 object-cover`,
    buttonMore: `
        rounded font-semibold border px-4 py-2 flex items-center justify-center
        cursor-pointer mt-4 hover:opacity-50
    `
}

Utils.bind(className);

export default className