import { faMessage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"


const Chat = () => {

    const [show, setShow] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: 0,
            content: "Hello, how can i help you?",
            type: 0
        },
        {
            id: 1,
            content: "Tôi muốn tư vấn chọn size cho sản phẩm 'Green Silk Midi Skirt', cân nặng của tôi là 44Kg, chiều cao 1.6m.",
            type: 1
        },
        {
            id: 3,
            content: "Với thông tin chiều cao và cân nặng của bạn, hãy lựa chọn size 'M' !",
            type: 0
        },
    ])

    return (
        <div>
            <div
                className="fixed bottom-8 left-10 p-4 flex items-center justify-center rounded-full bg-white shadow-xl cursor-pointer"
                onClick={() => setShow(!show)}>
                <FontAwesomeIcon
                    icon={faMessage}
                    className="text-xl text-gray-500" />
            </div>
            {show && (
                <div className="fixed bottom-24 left-10 w-96 h-[500px] bg-white rounded-md shadow-xl flex flex-col">
                    <div className="font-bold px-2 py-2 border-b-2 border-gray-300">LIBÉ SHOP</div>
                    <div className="flex-1 overflow-y-scroll flex flex-col py-2 px-2">
                        {messages.map(item => (
                            <div
                                key={item}
                                className={"flex flex-row mb-3" + (item.type == 1 ? " flex-row-reverse" : "")}>
                                {item.type == 0 && (
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg"
                                        className="w-10 h-10 rounded-full border border-gray-300 p-1"
                                        alt="image" />
                                )}
                                <div className={"p-2 border border-gray-300 bg-gray-100 rounded ml-1 text-sm" + (item.type == 1 ? " ml-12" : " mr-12")}>
                                    {item.content}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row h-12 px-2 pb-2 items-center">
                        <input
                            className="flex-1 h-full outline-none rounded-full border border-gray-300 px-3 text-sm"
                            placeholder="Enter question" />
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="text-blue-500 p-2 text-xl cursor-pointer ml-1 border rounded-full shadow" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chat