import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex flex-col bg-gray-900 text-white py-20 items-center w-full h-[100vh] overflow-x-hidden">
            <Topbar />
            <div>
                <Sidebar />
                <div className="ml-64">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default MainLayout