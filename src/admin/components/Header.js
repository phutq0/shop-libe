import { faBell, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

const Header = () => {

    return (
        <div className="w-full h-14 border-b shadow flex flex-row justify-between px-4 items-center">
            <div className="font-bold text-3xl">LIBÉ</div>
            <div className="flex flex-row items-center">
                <Notification
                    notify={true} />
                <Message
                    notify={true} />
                <Avatar />
            </div>
        </div>
    );
}

const Notification = (notify) => {

    return (
        <div>
            <Tippy
                placement="bottom-end"
                interactive={true}
                render={attrs => (
                    <div
                        {...attrs}
                        className="w-80 h-80 bg-white rounded border shadow -mt-2">
                        Hello
                    </div>
                )}>
                <div className="p-1 relative cursor-pointer hover:opacity-80">
                    {notify && (
                        <div className="absolute flex h-[10px] w-[10px] right-0 top-1">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></div>
                            <div className="relative inline-flex rounded-full h-[10px] w-[10px] bg-sky-500"></div>
                        </div>
                    )}
                    <FontAwesomeIcon
                        icon={faBell}
                        className="text-xl text-gray-600" />
                </div>
            </Tippy>
        </div>
    );
}
const Message = (notify) => {

    return (
        <div>
            <Tippy
                placement="bottom-end"
                interactive={true}
                render={attrs => (
                    <div
                        {...attrs}
                        className="w-80 h-80 bg-white rounded border shadow -mt-2">
                        Hello
                    </div>
                )}>
                <div className="p-1 relative cursor-pointer hover:opacity-80 ml-3">
                    {notify && (
                        <div className="absolute flex h-[10px] w-[10px] right-0 top-1">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></div>
                            <div className="relative inline-flex rounded-full h-[10px] w-[10px] bg-sky-500"></div>
                        </div>
                    )}
                    <FontAwesomeIcon
                        icon={faMessage}
                        className="text-lg text-gray-600" />
                </div>
            </Tippy>
        </div>
    );
}

const Avatar = () => {
    return (
        <div>
            <Tippy
                placement="bottom-end"
                interactive={true}
                render={attrs => (
                    <div
                        {...attrs}
                        className="w-32 bg-white rounded border shadow -mt-2 flex flex-col">
                        <div className="px-2 py-[6px] text-sm font-semibold hover:bg-gray-200 cursor-pointer">Logout</div>
                    </div>
                )}>
                <div className="p-1 cursor-pointer hover:opacity-80 ml-3">
                    <img
                        alt="avatar"
                        src="https://th.bing.com/th/id/R.ed4c5c82883ef4309eb02f8e2417646c?rik=L7mq4JeVSZO0Gw&riu=http%3a%2f%2fradiusblocks.com%2fwp-content%2fuploads%2f2022%2f09%2fimage-grid_3.jpg&ehk=lsdi%2bBpjRQvuIvmtlegfvmYOtqp0reJX%2baon5vAL4F4%3d&risl=&pid=ImgRaw&r=0"
                        className="w-8 h-8 rounded-full border-2 border-gray-400" />
                </div>
            </Tippy>
        </div>
    );
}

export default Header