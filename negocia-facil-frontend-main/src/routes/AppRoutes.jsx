import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login/Login.jsx"
import Register from "../pages/Auth/Register/Register.jsx"
import EditUsersAdminPage from "../pages/admin/EditUsersAdminPage/EditUsersAdminPage.jsx"
import ListUsersAdminPage from "../pages/admin/ListUsersAdminPage/ListUsersAdminPage.jsx"
import CreateUsersAdminPage from "../pages/admin/CreateUsersAdminPage/CreateUsersAdminPage.jsx"
import { Navigate } from "react-router";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
import MainLayout from "../pages/admin/AdminHomePage/MainLayout.jsx";
import Home from "../pages/Home.jsx"
import AdvertisementFormPage from "../pages/Advertisement/AdvertisementFormPage.jsx"
import ProductsPage from "../pages/Product/ProductsPage.jsx"
import RulesList from "./../pages/Rule/RulesList.jsx"
import RuleForm from "./../pages/Rule/RuleForm.jsx"
import UserAdvertisementsPage from "../pages/Advertisement/UserAdvertisementsPage.jsx";
import AdvertisementView from "../components/Advertisement/AdvertisementView.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Navigate to="/auth/login" />} />
                <Route path="*" element={<NotFoundPage />} />

                <Route element={<PrivateRoute />}>
                    <Route path="home" element={<Home />} />
                    <Route path="users">
                        <Route index element={<ProtectedRoute roles={["ROLE_ADMIN"]}><ListUsersAdminPage /></ProtectedRoute>} />
                        <Route path=":id" element={<EditUsersAdminPage />} />
                        <Route path="register" element={<ProtectedRoute roles={["ROLE_ADMIN"]}><CreateUsersAdminPage /></ProtectedRoute>} />
                    </Route>
                    <Route path="advertisements">
                        <Route index element={<Navigate to="user/:userId" />} />
                        <Route path="user/:userId" element={<UserAdvertisementsPage />} />
                        <Route path="new" element={<AdvertisementFormPage />} />
                        <Route path='edit/:id' element={<AdvertisementFormPage />} />
                        <Route path='details/:id' element={<AdvertisementView />} />
                    </Route>
                    <Route path='products/user/:userId' element={<ProductsPage />} />
                    <Route path="rules">
                        <Route index element={<RulesList />} />
                        <Route path="new" element={<ProtectedRoute roles={["ROLE_ADMIN"]}><RuleForm /></ProtectedRoute>} />
                        <Route path="edit" element={<ProtectedRoute roles={["ROLE_ADMIN"]}><RuleForm /></ProtectedRoute>} />
                    </Route>
                </Route>

                <Route path="auth">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

            </Routes>

        </BrowserRouter>
    )
}