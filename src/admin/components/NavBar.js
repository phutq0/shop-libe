import { faProductHunt } from "@fortawesome/free-brands-svg-icons"
import { faBorderAll, faFileInvoice, faHome, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation, useNavigate } from "react-router-dom"

const NavBar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const navbar = [
        { title: "Dashboard", icon: faHome, path: "/admin" },
        { title: "Collection", icon: faBorderAll, path: "/admin/collection" },
        { title: "Product", icon: faProductHunt, path: "/admin/product" },
        { title: "Order", icon: faFileInvoice, path: "/admin/order" },
        { title: "User", icon: faUser, path: "/admin/user" },
    ].map(item => ({
        ...item,
        active: item.path == location.pathname
    }));

    return (
        <div className="flex flex-col w-40 border-r border-gray-300 h-80 px-2 pt-4">
            {navbar.map((item, index) => (
                <ButtonRow
                    key={index}
                    {...item}
                    onClick={() => navigate(item.path)} />
            ))}
        </div>
    )
}

const ButtonRow = ({ title, icon, active, onClick }) => {

    return (
        <div className={"flex flex-row items-center border border-gray-300 rounded py-2 px-2 mb-1 cursor-pointer hover:bg-black hover:text-white" + (active ? " bg-black text-white" : "")}
            onClick={onClick}>
            <FontAwesomeIcon
                icon={icon}
                className="text-sm min-w-[24px]" />
            <div className="text-sm font-semibold ml-2">{title}</div>
        </div >
    )
}

export default NavBar