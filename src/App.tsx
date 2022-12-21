import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadMediaPage from "./pages/UploadMediaPage";
import ViewVideoPage from "./pages/ViewVideoPage";
import {ProtectedRoute} from "./routes/ProtectedRoute";
import {AuthProvider} from "./routes/AuthProvider";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashBoardPage from "./pages/DashBoardPage";
import ContentCatalogPage from "./pages/ContentCatalogPage";
import {CatalogProvider} from "./features/Catalog/CatalogProvider";
import ProfilePage from "./features/Profile/ProfilePage";
import CategoryPage from "./features/Category/CategoryPage";
import PornstarsPage from "./features/Pornstars/PornstarsPage";

function App() {
  return (

    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path={"/"} element={
                    <ProtectedRoute accessRoles={["USER", "ADMIN"]}>
                        <HomePage/>
                    </ProtectedRoute>
                }/>
                <Route path={"/catalog"} element={
                    <ProtectedRoute accessRoles={["USER", "ADMIN"]}>
                        <CatalogProvider><ContentCatalogPage/></CatalogProvider>
                    </ProtectedRoute>
                }/>
                <Route path={"/categories"} element={
                    <ProtectedRoute accessRoles={["USER", "ADMIN"]}>
                        <CatalogProvider><CategoryPage/></CatalogProvider>
                    </ProtectedRoute>
                }/>
                <Route path={"/pornstars"} element={
                    <ProtectedRoute accessRoles={["USER", "ADMIN"]}>
                        <CatalogProvider><PornstarsPage/></CatalogProvider>
                    </ProtectedRoute>
                }/>
                <Route path={"/view_video"} element={
                    <ProtectedRoute accessRoles={["USER", "ADMIN"]}>
                        <CatalogProvider><ViewVideoPage/></CatalogProvider>
                    </ProtectedRoute>
                }/>
                <Route path={"/upload"} element={
                    <ProtectedRoute accessRoles={["USER", "ADMIN"]}>
                        <UploadMediaPage/>
                    </ProtectedRoute>
                }/>
                <Route path={"/user_profile"} element={
                    <ProtectedRoute accessRoles={["USER", "ADMIN"]}>
                        <CatalogProvider><ProfilePage/></CatalogProvider>
                    </ProtectedRoute>
                }/>
                <Route path={"/dashboard"} element={<DashBoardPage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>

            </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
