import Header from "./Header";
import Modal from "./Modal";
import NavBar from "./NavBar";

const AdminLayout = ({ children }) => {

    return (
        <div className="flex flex-col">
            <Header />
            <div className="flex flex-row">
                <NavBar />
                <div className="flex-1">
                    {children}
                </div>
            </div>
            <Modal />
        </div>
    )
}

export default AdminLayout