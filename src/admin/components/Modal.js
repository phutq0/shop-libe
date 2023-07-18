import { useState } from "react"

const Modal = () => {

    return (
        <>
            <CollectionModal />
        </>
    )
}

const CollectionModal = () => {

    const [show, setShow] = useState(true);
    const defaultConfig = {
        title: "Collection",
        buttonLeft: "Cancel",
        buttonRight: "Create"
    }

    const [config, setConfig] = useState({ ...defaultConfig })

    return (
        <div>
            {show &&
                <>
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30"></div>
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div className="absolute top-0 left-0 right-0 bottom-0"></div>
                        <div className="w-60 h-60 bg-white border rounded shadow flex flex-col">
                            <div>{ }</div>
                            <div className="flex-1"></div>
                            <div className="flex flex-row px-1 py-2 border-t border-gray-300 text-sm font-semibold">
                                <div className="flex-1 flex items-center justify-center border border-gray-200 rounded bg-red-500 py-2 hover:opacity-70">{config.buttonLeft}</div>
                                <div className="flex-1 flex items-center justify-center border border-gray-200 rounded bg-green-500 py-2 ml-1 hover:opacity-70">{config.buttonRight}</div>
                            </div>
                        </div>
                    </div>

                </>
            }

        </div>
    )
}

export default Modal