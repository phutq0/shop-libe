import Header from "./Header";
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
        </div>
    )
}

export default AdminLayout