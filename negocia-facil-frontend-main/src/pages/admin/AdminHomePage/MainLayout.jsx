import { Outlet } from "react-router";
import SidebarLayout from "../../../layouts/admin/SidebarLayout/SidebarLayout.jsx";
export default function MainLayout() {
    return (
        <SidebarLayout>
            <Outlet/>
        </SidebarLayout>
    )
}